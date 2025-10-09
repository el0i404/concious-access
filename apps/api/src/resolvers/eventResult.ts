/* eslint-disable @typescript-eslint/no-explicit-any */
import { GraphQLError } from 'graphql';
import { Types } from 'mongoose';
import { COMMON } from '../config';
import EventResult from '../models/EventResult';
import { generateUniqueCode } from '../utils';
import authenticateToken from '../utils/authenticateToken';
import moment from 'moment';
import Event from '../models/Event';

interface ResultArgs {
  event_id: Types.ObjectId;
  is_passed: boolean;
  is_qr_code_scanned: boolean;
  qr_code_number: string;
  createdAt?: Date;
}

function getQrCodeScannedTime(time) {
  const now = moment(new Date(time)).utcOffset(2).format('HH:mm:ss');
  return now;
}

const eventResultResolver = {
  Mutation: {
    /*
     * Submit the Event Answers and Generate result
     * @param event_id:ID, event_result:[{id:ID,correct_answer:string}]
     */

    submitResult: async (
      _: unknown,
      { event_id, event_result }
    ): Promise<ResultArgs> => {
      //fetch event from db
      const event = await Event.findById(event_id);

      if (!event) {
        throw new GraphQLError('Event not found.');
      }

      let isUserPassed = false;

      // filter the guide_lines with type 'mcq'
      const mcqEvent = event.guide_lines.filter((item) => item.type === 'mcq');

      // failed if answers are not provided matches with the length of mcqEvent
      if (mcqEvent.length !== event_result.length) {
        throw new GraphQLError('Some questions were not answered.');
      }

      // check the all the answers are correct | not.
      const isIncorrectAnswers = mcqEvent.filter((item1) => {
        const quizQuestion = event_result.find(
          (item) => item.id === item1._id.toString()
        );

        return (
          quizQuestion &&
          item1.correct_answer.toString() !==
            quizQuestion.correct_answer.toString()
        );
      });
      if (isIncorrectAnswers.length > 0) {
        throw new GraphQLError(
          'Some of the MCQ answers are incorrect. Please try again'
        );
      } else {
        isUserPassed = true;
      }

      // Generates the QR code
      const uniqueCode = await generateUniqueCode('event_result');

      // append the the id with guideline_id for the eventResult to store in DB & delete the id.
      const eventResult = event_result.map(({ id, ...rest }) => ({
        ...rest,
        guideline_id: id,
      }));
      delete eventResult.id;

      const newEvent = new EventResult({
        event_id,
        event_result: eventResult,
        qr_code_number: uniqueCode,
        is_passed: isUserPassed,
      });

      const saveEvent = await newEvent.save();

      const { is_passed, is_qr_code_scanned, qr_code_number, createdAt } =
        saveEvent;

      return {
        event_id,
        is_passed,
        is_qr_code_scanned,
        qr_code_number,
        createdAt,
      };
    },

    /*
     * Scan QR code and respond with True / False
     * @params qr_code_number : UNIQUE 12 Digit code.
     */
    scanQRCode: async (_, { qr_code_number }, { req }) => {
      try {
        // Check the Auth Token
        const tokenSecret = req.headers?.authorization?.split(' ')[1];
        const isAuthenticated = await authenticateToken(tokenSecret);
        if (!isAuthenticated) {
          throw new GraphQLError(COMMON.INVALID_OR_EXPIRED_TOKEN, {
            extensions: { code: '401' },
          });
        }
        if (isAuthenticated.role === 'admin') {
          throw new GraphQLError('You are not authorized to scan the QR code', {
            extensions: { code: '401' },
          });
        }

        const eventResult: any = await EventResult.findOne({
          qr_code_number: qr_code_number,
        });

        if (!eventResult) {
          throw new GraphQLError(
            'This ticket is either for a different event or not created by AwarenessPass'
          );
        }

        const event = await Event.findById(eventResult._id);
        if (event && event.user_id.toString() !== isAuthenticated.id) {
          throw new GraphQLError('You are not authorized to scan the QR code');
        }

        // Usage example:
        let qrCodeScannedTime = new Date();

        if (eventResult?.is_qr_code_scanned) {
          qrCodeScannedTime = new Date(eventResult.createdAt);
          return {
            id: eventResult._id,
            is_qr_code_scanned: eventResult.is_qr_code_scanned,
            qr_code_scanned_time: qrCodeScannedTime,
            message: `This ticket was already scanned at ${getQrCodeScannedTime(
              eventResult.createdAt
            )}`,
            success: false, // if already scanned returns false
          };
        } else {
          eventResult.is_qr_code_scanned = true;
          eventResult.qr_code_scanned_time = qrCodeScannedTime;
          await eventResult.save();
          return {
            id: eventResult._id,
            qr_code_scanned_time: qrCodeScannedTime,
            message: 'QR code has been scanned successfully',
            success: true,
          };
        }
      } catch (error) {
        return new GraphQLError(error);
      }
    },
  },
};
export default eventResultResolver;
