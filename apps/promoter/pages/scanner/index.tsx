/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Layout } from '../../components';
import { QrReader } from 'react-qr-reader';
import { Button, Flex, Input, Text } from '@awareness/ui';
import { useScanQrCodeMutation } from '@awareness/graphql';
import Image from 'next/image';
import Loader from '../..//components/loader';

const Scanner: React.FC = () => {
  const [code, setCode] = useState<string>('');
  const [isScanDone, setIsScanDone] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean | null | undefined>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null | undefined>(null);
  const [status, setStatus] = useState<boolean | null | undefined>(false); // response status
  const [isLoading, setIsLoading] = useState<boolean | null>(false);

  const [scanQrCodeMutation] = useScanQrCodeMutation();

  /**
   * change value of code from input field
   * @param {React.ChangeEvent<HTMLInputElement>} e
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setCode(e.target.value);
  };

  /**
   * handle mutation and call API
   * @param value
   * @returns response.data
   */
  const handleMutation = async (value: string) => {
    setIsLoading(true);
    try {
      const response = await scanQrCodeMutation({
        variables: {
          qrCodeNumber: value,
        },
      });
      setMessage(response.data?.scanQRCode.message);
      setStatus(response.data?.scanQRCode.success);
    } catch (error: any) {
      setIsError(true);
      setStatus(false);
      setErrorMessage(error.message);
    }
    setIsScanDone(true);
    setIsLoading(false);
  };

  /**
   * submit the scanned data to the backend
   * @param data
   */
  const handleScan = async (data: any) => {
    if (code === '') {
      if (data) {
        setCode(data.text);
        await handleMutation(data.text);
      }
    }
  };

  /**
   * handle submit using input box
   * @param data
   */
  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    await handleMutation(code);
  };

  /**
   * Scan other ticket and reset existing states
   */
  const handleScanAnotherTicket = () => {
    setIsScanDone(false);
    setStatus(false);
    setIsError(false);
    setErrorMessage('');
    setCode('');
    setMessage(null);
  };

  return (
    <Layout backRoute="events">
      <Flex
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
        }}
      >
        {isLoading ? (
          <>
            <Loader />
          </>
        ) : (
          <>
            {/* Scanner */}
            {!isError && !isScanDone && (
              <QrReader
                scanDelay={600}
                onResult={handleScan}
                constraints={{
                  facingMode: 'environment',
                }}
              />
            )}
            {/* Submit & handle different results */}
            {!isScanDone ? (
              <Flex
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  flex: '1',
                  position: 'absolute',
                  bottom: '16px',
                  width: '100%',
                }}
              >
                <Text
                  textAlign={'center'}
                  padding={20}
                  paddingTop={0}
                  fontSize={20}
                >
                  Or
                </Text>
                <Flex
                  style={{ gap: '10px', margin: '15px ' }}
                  alignItems="center"
                  justifyContent="flex-start"
                >
                  <div style={{ width: '100%' }}>
                    <Input
                      style={{ width: '100%' }}
                      placeholder="Enter ticket number"
                      value={code}
                      onChange={handleChange}
                    />
                  </div>
                  <Button disabled={code == ''} onClick={handleSubmit}>
                    Submit
                  </Button>
                </Flex>
              </Flex>
            ) : isError ? (
              <div className="error-div">
                <div className="valid-ticket not-found-ticket">
                  <Flex
                    marginBottom="18px"
                    style={{ gap: '4px' }}
                    flexDirection={'column'}
                  >
                    <Flex style={{ gap: '4px' }}>
                      <Image
                        src="/NotFoundTicket.svg"
                        width={32}
                        height={32}
                        alt="Avatar"
                      />
                      <Text fontSize={20}>Ticket Not Recognized!!</Text>
                    </Flex>
                    <Text fontSize={1}>#{code}</Text>
                  </Flex>
                  <Text fontSize={2}>{errorMessage}</Text>
                  <Button
                    style={{ marginTop: '18px' }}
                    onClick={handleScanAnotherTicket}
                  >
                    <Text
                      fontSize="16px"
                      fontWeight="700"
                      color="black"
                      lineHeight="-0.56px"
                    >
                      Scan another Ticket
                    </Text>
                  </Button>
                </div>
              </div>
            ) : !status ? (
              <div className="error-div">
                <div className="valid-ticket used-ticket">
                  <Flex style={{ gap: '4px' }} flexDirection={'column'}>
                    <Flex style={{ gap: '4px' }}>
                      <Image
                        src="/UsedTicket.svg"
                        width={32}
                        height={32}
                        alt="Avatar"
                      />
                      <Text fontSize={20}>Used Ticket!</Text>
                    </Flex>
                    <Flex>
                      <Text fontSize={1}>#{code}</Text>
                    </Flex>
                  </Flex>
                  <Text fontSize={2}>{message}</Text>
                  <Button onClick={handleScanAnotherTicket}>
                    <span
                      style={{
                        fontSize: '16px',
                        fontWeight: 700,
                        lineHeight: '-0.56px',
                      }}
                    >
                      Scan another Ticket
                    </span>
                  </Button>
                </div>
              </div>
            ) : (
              <div className="success-div">
                <div className="valid-ticket">
                  <Flex style={{ gap: '4px' }}>
                    <Image
                      src="/valid-ticket.svg"
                      width={32}
                      height={32}
                      alt="Avatar"
                    />
                    <Text fontSize={20}>Valid Ticket!</Text>
                  </Flex>
                  <Flex>
                    <Text color={'#B5B5B5'} fontSize={1}>
                      #{code}
                    </Text>
                  </Flex>

                  <Button
                    style={{ marginTop: '15px' }}
                    onClick={handleScanAnotherTicket}
                  >
                    <span
                      style={{
                        fontSize: '16px',
                        fontWeight: 700,
                        lineHeight: '-0.56px',
                      }}
                    >
                      Scan another Ticket
                    </span>
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </Flex>
      <style jsx>{`
        .error-div {
          position: absolute;
          bottom: 32px;
          width: 100%;
          padding: 10px;
        }
        .success-div {
          position: absolute;
          bottom: 32px;
          width: 100%;
          padding: 10px;
        }
        .valid-ticket {
          display: flex;
          flex-direction: column;
          width: 100%;
          margin: auto;
          color: #fff;
          padding: 16px;
          border: 2px solid #fff;
          border-radius: 8px;
        }
        .used-ticket {
          gap: 18px;
          background-color: #e37a58;
        }
        .not-found-ticket {
          background-color: #eb4526;
        }
      `}</style>
    </Layout>
  );
};

export default Scanner;
