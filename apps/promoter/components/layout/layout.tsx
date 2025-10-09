// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { ReactNode, Fragment, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { usePathname } from 'next/navigation';
import { UIProvider, Flex, Button, Text } from '@awareness/ui';
import HorizontalNav from '../horizontal-nav/horizontal-nav';

const Layout = ({
  children,
  backRoute,
  handleOnLogout,
  handleReorder,
  handleCancelOnReorder,
  handleDoneOnReorder,
  handlePreviewQuiz,
  handleCloseQuiz,
  showLogo,
  eventListLength,
}: {
  children: ReactNode;
  backRoute?: string;
  handleOnLogout?: () => void;
  handleReorder?: () => void;
  handleCancelOnReorder?: () => void;
  handleDoneOnReorder?: () => void;
  handlePreviewQuiz?: () => void;
  handleCloseQuiz?: () => void;
  showLogo?: boolean;
  eventListLength?: boolean;
}) => (
  <UIProvider>
    <LayoutWrapper
      showLogo={showLogo}
      backRoute={backRoute}
      handleOnLogout={handleOnLogout}
      handleReorder={handleReorder}
      handleCancelOnReorder={handleCancelOnReorder}
      handleDoneOnReorder={handleDoneOnReorder}
      handlePreviewQuiz={handlePreviewQuiz}
      handleCloseQuiz={handleCloseQuiz}
      eventListLength={eventListLength}
    >
      {children}
    </LayoutWrapper>
  </UIProvider>
);

const LayoutWrapper = ({
  children,
  backRoute,
  handleOnLogout,
  handleReorder,
  handleCancelOnReorder,
  handleDoneOnReorder,
  handlePreviewQuiz,
  handleCloseQuiz,
  showLogo,
  eventListLength,
}: {
  children: ReactNode;
  backRoute?: string;
  handleOnLogout?: () => void;
  handleReorder?: () => void;
  handleCancelOnReorder?: () => void;
  handleDoneOnReorder?: () => void;
  handlePreviewQuiz?: () => void;
  handleCloseQuiz?: () => void;
  showLogo?: boolean;
  eventListLength?: boolean;
}) => {
  const router = useRouter();
  let pathNameIsTakeQuiz = null;
  if (router.query) {
    const organization = router.query.organization;
    const event = router.query.eventId;
    pathNameIsTakeQuiz = organization && event;
  }

  const pathname = usePathname();
  const [isEditable, setIsEditable] = useState();
  const pathnameIsEvents = pathname?.includes('events');
  const pathnameIsNewEvent = pathname?.includes('new-event');
  const pathnameIsCreateGuidelines = pathname?.includes('create-guidelines');
  const pathNameIsReorderGuidelines = pathname?.includes('reorder-guidelines');
  const pathNameIsPreviewQuiz = pathname?.includes('preview-quiz');
  const pathNameIsScanner = pathname?.includes('scanner');

  const handleClearEventInfo = () => {
    window.localStorage.removeItem('event-info');
    router.push('/new-event');
  };

  useEffect(() => {
    const isEditable =
      typeof window !== 'undefined' &&
      window.localStorage.getItem('is-editable-event') === 'yes';
    setIsEditable(isEditable);
  }, [isEditable]);

  return (
    <Flex
      overflow="auto"
      height="100svh"
      flexDirection="column"
      alignItems="center"
      padding="0 16px 32px 16px"
      backgroundColor="var(--brand-black, #1C1C1C);"
      overflowX="hidden"
    >
      <Flex
        flexDirection="column"
        width={pathNameIsScanner ? ['100vw'] : ['95vw', '70vw', '50vw']}
      >
        <Flex
          flexDirection="column"
          position="sticky"
          top={0}
          zIndex={100}
          width="100%"
          backgroundColor="var(--brand-black,#1C1C1C)"
        >
          <Flex
            justifyContent={showLogo ? 'center' : 'space-between'}
            alignItems="center"
            height="50px"
          >
            {/* Reorder Guidelines Header */}
            {pathNameIsReorderGuidelines ? (
              <>
                <Button
                  variant="quartary"
                  style={{
                    paddingRight: '0',
                    textDecoration: 'underline',
                    fontWeight: '600',
                  }}
                  onClick={handleCancelOnReorder}
                >
                  Cancel
                </Button>
                <Text color="white" fontSize={3}>
                  Reorder
                </Text>
                <Button
                  variant="quartary"
                  style={{
                    paddingRight: '0',
                    textDecoration: 'underline',
                    fontWeight: '600',
                  }}
                  onClick={handleDoneOnReorder}
                >
                  Done
                </Button>
              </>
            ) : pathnameIsEvents || pathNameIsTakeQuiz ? (
              showLogo ? (
                <Flex alignItems="center">
                  <Image
                    src="/Avatar.svg"
                    width={32}
                    height={32}
                    alt="Avatar"
                  />
                  <Text paddingLeft={4} fontSize={1}>
                    AwarenessPass
                  </Text>
                </Flex>
              ) : (
                <Image src="/Avatar.svg" width={32} height={32} alt="Avatar" />
              )
            ) : pathNameIsPreviewQuiz ? (
              <>
                <div>
                  <Image
                    src="/Avatar.svg"
                    width={32}
                    height={32}
                    alt="Avatar"
                  />
                  <Text paddingLeft={4} fontSize={1}>
                    AwarenessPass
                  </Text>
                </div>
                <Button
                  variant="quartary"
                  style={{
                    paddingRight: '0',
                    textDecoration: 'underline',
                    fontWeight: '600',
                  }}
                  onClick={handleCloseQuiz}
                >
                  Close Preview
                </Button>
              </>
            ) : pathNameIsScanner ? (
              <Button
                size="small"
                style={{ margin: '20px' }}
                onClick={() => router.push(backRoute)}
              >
                <Image
                  src="/BackIcon.svg"
                  width={14}
                  height={22}
                  alt="Go back"
                />
                <Text paddingLeft={10} fontSize={2} color="black">
                  Back
                </Text>
              </Button>
            ) : (
              <>
                <Link href={`/${backRoute}`}>
                  <Image src="/Menu.svg" width={32} height={32} alt="Go back" />
                </Link>
                {pathnameIsCreateGuidelines && eventListLength > 0 && (
                  <div>
                    <Button
                      disabled={eventListLength <= 1}
                      variant="quartary"
                      style={{
                        paddingRight: '0',
                        textDecoration: `${
                          eventListLength <= 1 ? 'none' : 'underline'
                        }`,
                        fontWeight: '600',
                      }}
                      onClick={handleReorder}
                    >
                      Reorder pages
                    </Button>

                    <Button
                      variant="quartary"
                      style={{
                        paddingRight: '0',
                        textDecoration: 'underline',
                        fontWeight: '600',
                      }}
                      onClick={handlePreviewQuiz}
                    >
                      Preview Quiz
                    </Button>
                  </div>
                )}
              </>
            )}

            {/* Logout */}
            {pathnameIsEvents && (
              <Button
                variant="quartary"
                style={{ paddingRight: '0' }}
                onClick={handleOnLogout}
              >
                Log out
              </Button>
            )}
          </Flex>
          {/* Guidelines / Event Header */}
          {pathnameIsNewEvent ? (
            <Flex>
              <Text color="white" fontSize={5}>
                {isEditable ? 'Edit Event' : 'New Event'}
              </Text>
            </Flex>
          ) : null}
          <Flex flexDirection="column">
            {pathnameIsEvents ? (
              <Fragment>
                <HorizontalNav />
                <Flex flexDirection="column" color="white" pb={5}>
                  <Text
                    color="white"
                    style={{ cursor: 'pointer' }}
                    onClick={handleClearEventInfo}
                  >
                    + Create Event
                  </Text>
                </Flex>
              </Fragment>
            ) : (
              ''
            )}
          </Flex>
        </Flex>
        <Flex>{children}</Flex>
      </Flex>
    </Flex>
  );
};

export default Layout;
