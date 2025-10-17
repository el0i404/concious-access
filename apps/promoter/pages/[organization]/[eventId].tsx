/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useState } from "react";
import { Layout } from "../../components";
import { Button, Flex, Text } from "@awareness/ui";
import { useRouter } from "next/router";
import {
  useGetEventWithoutAnswersQuery,
  useSubmitResultMutation,
} from "@awareness/graphql";
import { useIsMobile } from "@awareness/hooks";
import QRCode from "react-qr-code";
import { useWallet } from "@solana/wallet-adapter-react";
import Loader from "../../components/loader";
const optionLabels = ["A", "B", "C", "D"]; // maximum number of labels

import { create, mplCore } from "@metaplex-foundation/mpl-core";
import { walletAdapterIdentity } from "@metaplex-foundation/umi-signer-wallet-adapters";
import {
  createGenericFile,
  generateSigner,
  signerIdentity,
  sol,
} from "@metaplex-foundation/umi";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys";
import { base58 } from "@metaplex-foundation/umi/serializers";

import path from "path";

function getCurrentDate(date: string) {
  const now = new Date(date);
  const day = String(now.getDate()).padStart(2, "0"); // Get day and pad with leading zero if necessary
  const month = String(now.getMonth() + 1).padStart(2, "0"); // Get month (add 1 because months are 0-indexed) and pad with leading zero if necessary
  const year = now.getFullYear(); // Get full year

  return `${day}.${month}.${year}`;
}

const QuizTaking: FC = () => {
  const router = useRouter();
  const wallet = useWallet();
  const isMobile = useIsMobile();
  let eventId: any = "";
  if (router.query) {
    eventId = router?.query?.eventId;
  }

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState<{ [key: string]: string }>({});
  const [SubmitResultMutation] = useSubmitResultMutation();

  const [isError, setIsError] = useState<boolean>(false);
  const [showLogo, setShowLogo] = useState<boolean>(false);
  const [hasPassed, setHasPassed] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isQRCodeScanned, setIsQRCodeScanned] = useState<boolean>(false);
  const [qrCode, setQrCode] = useState<string>("");
  const [date, setDate] = useState<string | null | undefined>("");

  /**
   * getEventDetails & Questions
   */

  const {
    loading: showLoading,
    data: eventData,
    error: getEventError,
  } = useGetEventWithoutAnswersQuery({
    variables: { getEventWithoutAnswersId: eventId },
  });

  console.log("eventData", eventData);
  const currentQues =
    eventData?.getEventWithoutAnswers?.guide_lines?.[currentQuestion];

  /**
   * Next button click handler
   */
  const handleNext = () => {
    if (
      currentQuestion <
      (eventData?.getEventWithoutAnswers?.guide_lines?.length ?? 0) - 1
    ) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const createNft = async () => {
    const umi = createUmi("https://api.devnet.solana.com")
      .use(mplCore())
      // Register Wallet Adapter to Umi
      .use(
        irysUploader({
          // mainnet address: "https://node1.irys.xyz"
          // devnet address: "https://devnet.irys.xyz"
          address: "https://devnet.irys.xyz",
        })
      );

    const signer = generateSigner(umi);

    umi.use(signerIdentity(signer));
    console.log("Airdropping 1 SOL to identity");
    await umi.rpc.airdrop(umi.identity.publicKey, sol(1));

    const metadata = {
      name: "My NFT",
      description: "This is an NFT on Solana",
      image:
        "https://awareness-promoter.vercel.app/hotmail/671bd1f2a166df689f0adb4c",
      external_url: "https://example.com",
      attributes: [
        {
          trait_type: "trait1",
          value: "value1",
        },
        {
          trait_type: "trait2",
          value: "value2",
        },
      ],
      properties: {
        files: [
          {
            uri: "https://awareness-promoter.vercel.app/hotmail/671bd1f2a166df689f0adb4c",
            type: "image/jpeg",
          },
        ],
        category: "image",
      },
    };

    const metadataUri = await umi.uploader.uploadJson(metadata).catch((err) => {
      throw new Error(err);
    });

    const asset = generateSigner(umi);

    const tx = await create(umi, {
      asset,
      name: "My NFT",
      uri: metadataUri,
    }).sendAndConfirm(umi);

    const signature = base58.deserialize(tx.signature)[0];

    console.log("signature", signature);
  };

  /**
   * Previous button click handler
   */
  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  /**
   * Handle quiz submission
   */
  const handleSubmitQuiz = async () => {
    // Combine user answers with question IDs
    const mcq_question_list =
      eventData?.getEventWithoutAnswers?.guide_lines?.filter(
        (guideLine) => guideLine?.type !== "short_text"
      );

    const quizData = (mcq_question_list ?? []).map((guideLine) => ({
      id: guideLine?.id ?? "",
      correct_answer: userAnswers[guideLine?.id ?? ""] || "", // default to an empty string if not answered
    }));

    if (eventData?.getEventWithoutAnswers.id && quizData.length > 0) {
      setIsLoading(true);
      try {
        const response = await SubmitResultMutation({
          variables: {
            eventId: eventData?.getEventWithoutAnswers.id,
            eventResult: quizData,
          },
        });
        createNft();
        if (response.data?.submitResult?.is_passed) {
          setHasPassed(response.data?.submitResult?.is_passed);
          setIsQRCodeScanned(response.data?.submitResult?.is_qr_code_scanned);
          setQrCode(response.data?.submitResult?.qr_code_number ?? "");
          setDate(response.data?.submitResult?.createdAt);
        }
      } catch (error: any) {
        setIsError(true);
      } finally {
        setIsLoading(false);
        setShowLogo(true);
      }
    }
  };

  return (
    <Layout backRoute="#" showLogo={showLogo}>
      {showLoading || isLoading ? (
        <Loader />
      ) : !currentQues || isError || getEventError ? (
        <Flex
          flexDirection={"column"}
          justifyContent={"flex-end"}
          fontFamily="Urbanist"
        >
          {getEventError || !currentQues ? (
            <>
              <Text fontSize={"32px"} marginBottom={24} fontWeight={700}>
                It’s empty quiz, contact support for further assistance
              </Text>
            </>
          ) : (
            <>
              <Text fontSize={"56px"} fontWeight={800}>
                Not Quite
              </Text>
              <Text marginBottom={24} fontSize={2} fontWeight={400}>
                You didn’t pass. Take the quiz again.
              </Text>
              <Button
                width={"130px"}
                size="small"
                onClick={() => {
                  router.push(window.location.href);
                  setIsError(false);
                  setCurrentQuestion(0);
                  setUserAnswers({});
                  setShowLogo(false);
                }}
              >
                <Text color={"black"} fontSize={2}>
                  Restart Quiz
                </Text>
              </Button>
            </>
          )}
        </Flex>
      ) : hasPassed ? (
        <Flex flexDirection="column" fontFamily="Urbanist" marginTop="1em">
          <Text fontSize="14px" fontWeight={400}>
            Take a screenshot of this code to show at the party and have fun!
          </Text>
          <Flex
            marginTop={5}
            flexDirection="column"
            backgroundColor="#fff"
            flex={1}
            justifyContent="center"
          >
            <div
              style={{
                padding: "4em",
                paddingBottom: "1em",
              }}
            >
              <QRCode
                size={256}
                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                value={qrCode}
                viewBox={`0 0 256 256`}
              />
            </div>
            <Flex
              alignItems="center"
              justifyContent="center"
              flexDirection="column"
              margin={5}
            >
              <Text fontSize="14px" color="#000">
                Single use
              </Text>
              <Text fontSize="14px" color="#000">
                {qrCode}
              </Text>
            </Flex>
            <Flex
              alignItems="start"
              justifyContent="center"
              flexDirection="column"
              backgroundColor={"#E37A58"}
              padding="16px"
            >
              <Text fontSize="28px" fontWeight={600} color="#000">
                {eventData?.getEventWithoutAnswers.name}
              </Text>
              <Text fontSize="14px" fontWeight={400} color="#000">
                {getCurrentDate(date || new Date().toString())}
              </Text>
            </Flex>
          </Flex>
          <Flex
            marginTop={5}
            flexDirection="column"
            flex={1}
            justifyContent="center"
          >
            <Text
              fontSize="56px"
              fontWeight={800}
              color="#fff"
              letterSpacing="-0.855px"
            >
              100%
            </Text>
            <Text color="#fff" fontSize="16px" letterSpacing="-0.56px">
              Congratulations! You passed. Click the link below to generate your
              one-time use pass. If you lose your pass, you can always take the
              quiz again.
            </Text>
          </Flex>
        </Flex>
      ) : (
        <Flex
          fontFamily="Urbanist"
          flexDirection="column"
          width="100%"
          position={isMobile ? "relative" : "unset"}
        >
          {/* Current Question based on it's type */}
          <div
            key={currentQues?.id}
            style={{ paddingTop: "20px", fontFamily: "Urbanist" }}
          >
            {currentQues && currentQues?.type === "short_text" ? (
              <>
                {/* Short text */}
                <Text fontSize={6} fontWeight={700} lineHeight="40px">
                  {currentQues?.title}
                </Text>
                <div>
                  <Text fontSize={2}>{currentQues?.body}</Text>
                </div>
              </>
            ) : (
              // MCQuestion
              // Inside the MCQ rendering section of your component

              <>
                <Text fontSize={5} fontWeight={400}>
                  {currentQues?.title}
                </Text>
                {currentQues?.mcq_question_list?.map((question, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      border: "2px solid white",
                      padding: 16,
                      marginTop: 32,
                      borderRadius: "8px",
                      backgroundColor:
                        userAnswers[currentQues?.id] === question?.value
                          ? "#FFFFFF"
                          : "#3C3C3C",
                      boxShadow: "8px 8px black, 8px 8px 0px 2px #FFFFFF",
                      cursor: "pointer", // Add cursor style to indicate click ability
                    }}
                    onClick={() => {
                      setUserAnswers({
                        ...userAnswers,
                        [currentQues?.id]: question?.value ?? "",
                      });
                    }}
                  >
                    <Text
                      color={
                        userAnswers[currentQues?.id] === question?.value
                          ? "black"
                          : "#B5B5B5"
                      }
                      fontSize={1}
                      fontWeight={700}
                    >
                      {optionLabels[index]} {". "}
                    </Text>
                    <Text
                      color={
                        userAnswers[currentQues?.id] === question?.value
                          ? "black"
                          : "white"
                      }
                      fontSize={3}
                    >
                      {question?.label}
                    </Text>
                  </div>
                ))}
              </>
            )}
          </div>

          {/* Buttons */}
          <div
            className={
              isMobile
                ? "button-mobile-screen"
                : "button-positions-normal-screen"
            }
          >
            <div>
              {!(currentQues?.seq_id === 1) && (
                <Button variant="quartary" onClick={handlePrev}>
                  Back
                </Button>
              )}
            </div>
            <div>
              {currentQues?.seq_id ===
              eventData?.getEventWithoutAnswers?.guide_lines?.length ? (
                <Button onClick={handleSubmitQuiz}>Submit Quiz</Button>
              ) : (
                <Button onClick={handleNext}>Next</Button>
              )}
            </div>
          </div>
        </Flex>
      )}
      <style jsx>{`
        .button-positions-normal-screen {
          position: fixed;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          justify-content: space-between;
          width: 80%;
          max-width: 600px;
          padding: 20px 0;
        }

        .button-mobile-screen {
          position: fixed;
          bottom: 0;
          left: 0;
          width: 100%;
          display: flex;
          justify-content: space-between;
          padding: 20px;
        }
      `}</style>
    </Layout>
  );
};

export default QuizTaking;
