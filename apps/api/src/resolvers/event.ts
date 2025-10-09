import { GraphQLError } from 'graphql';

import Event from '../models/Event';
import User from '../models/User';
import { COMMON, FRONTEND_URL } from '../config';
import authenticateToken from '../utils/authenticateToken';
import { hasDuplicates, validationSchema } from '../utils/validationChecks';

const eventResolver = {
  Query: {
    /*
     *   Event Listing
     */
    getEvents: async (_, __, { req }) => {
      // Fetch all events
      const tokenSecret = req.headers?.authorization?.split(' ')[1];
      const isAuthenticated = await authenticateToken(tokenSecret);
      if (!isAuthenticated) {
        throw new GraphQLError(COMMON.INVALID_OR_EXPIRED_TOKEN, {
          extensions: { code: '401' },
        });
      }
      try {
        const userId = isAuthenticated?.id;
        const user = await User.findById(userId);
        if (!user) {
          throw new GraphQLError(COMMON.INVALID_OR_EXPIRED_TOKEN, {
            extensions: { code: '401' },
          });
        }
        const events = await Event.find({ user_id: userId }).sort({
          createdAt: -1,
        });

        events.length &&
          events.map((eve) => {
            eve[
              'sharable_link'
            ] = `${FRONTEND_URL}${user?.organization}/${eve._id}`;
          });

        return events;
      } catch (error) {
        return new GraphQLError(error);
      }
    },

    /*
     *   Event Based on Id
     */
    getEvent: async (_, { id }, { req }) => {
      // Fetch event details based on ID
      const tokenSecret = req.headers?.authorization?.split(' ')[1];
      const isAuthenticated = await authenticateToken(tokenSecret);
      if (!isAuthenticated) {
        throw new GraphQLError(COMMON.INVALID_OR_EXPIRED_TOKEN, {
          extensions: { code: '401' },
        });
      }
      try {
        const event = await Event.findById(id);
        let eventWOanswers = null;

        if (isAuthenticated?.id !== event?.user_id.toString()) {
          eventWOanswers = await Event.findById(id, {
            'guide_lines.correct_answer': 0,
          });
        }

        // Set the id field to a non-null value
        const updatedEvent = eventWOanswers ? eventWOanswers : event;

        updatedEvent.id = event._id.toString();

        const user_id = event.user_id;
        const user = await User.findById(user_id);

        // Create Sharable Link
        updatedEvent[
          'sharable_link'
        ] = `${FRONTEND_URL}${user?.organization}/${id}`;

        return updatedEvent;
      } catch (error) {
        return new GraphQLError(error);
      }
    },
    /*
     * Get Events without answers
     */
    getEventWithoutAnswers: async (_, { id }, { req }) => {
      // Fetch event details based on ID
      try {
        const event = await Event.findById(id, {
          'guide_lines.correct_answer': 0,
        });

        if (!event) {
          throw new GraphQLError('Invalid ID provided for event');
        }
        const updatedEvent = event;

        const user_id = event.user_id;
        const user = await User.findById(user_id);

        // Create Sharable Link
        updatedEvent[
          'sharable_link'
        ] = `${FRONTEND_URL}${user?.organization}/${id}`;

        return updatedEvent;
      } catch (error) {
        return new GraphQLError(error);
      }
    },
  },
  Mutation: {
    /*
     * Create Event
     */
    createEvent: async (_, { event }, { req }) => {
      try {
        const tokenSecret = req.headers?.authorization?.split(' ')[1];
        const isAuthenticated = await authenticateToken(tokenSecret);
        if (!isAuthenticated) {
          throw new GraphQLError(COMMON.INVALID_OR_EXPIRED_TOKEN, {
            extensions: { code: '401' },
          });
        }
        if (isAuthenticated.role === 'admin') {
          throw new GraphQLError('You are not authorized to create event', {
            extensions: { code: '401' },
          });
        }

        if (event[0]?.guide_lines) {
          event[0].guide_lines.map((item) => {
            if (item.type === 'mcq') {
              if (item?.mcq_question_list?.length) {
                if (
                  item.mcq_question_list.length === 2 ||
                  item.mcq_question_list.length === 4
                ) {
                  return;
                } else if (
                  item.mcq_question_list.length < 2 ||
                  item.mcq_question_list.length > 4
                ) {
                  throw new GraphQLError(
                    'MCQ options length must be minimum 2 and maximum 4.'
                  );
                }
                if (hasDuplicates(item.mcq_question_list)) {
                  throw new GraphQLError(
                    'Duplicate values found in MCQ Option Lists'
                  );
                  return;
                }
                if (item.correct_answer) {
                  for (const option of item.mcq_question_list) {
                    if (option.value === item.correct_answer) {
                      return;
                    }
                  }
                  throw new GraphQLError(
                    'Answer is not matching with given options'
                  );
                } else {
                  throw new GraphQLError('Correct answer is required');
                }
              } else {
                throw new GraphQLError('MCQ options are required');
              }
            }
          });
        }
        const eventData = {
          ...event[0],
          user_id: isAuthenticated.id,
        };

        const newEvent = new Event(eventData);

        await newEvent.save();

        const user_id = isAuthenticated?.id;
        const user = await User.findById(user_id);
        if (!user) {
          throw new GraphQLError(COMMON.INVALID_OR_EXPIRED_TOKEN, {
            extensions: { code: '401' },
          });
        }
        // Create Sharable Link
        newEvent[
          'sharable_link'
        ] = `${FRONTEND_URL}${user?.organization}/${newEvent._id}`;

        if (newEvent) {
          return {
            status: 0,
            message: 'Event created successfully.',
            data: newEvent,
          };
        } else {
          return {
            status: 1,
            message: 'Something went wrong, while creating an Event',
            data: null,
          };
        }
      } catch (error) {
        throw new GraphQLError(error);
      }
    },

    /*
     * Update Event
     */
    updateEvent: async (_, { id, event }, { req }) => {
      try {
        const tokenSecret = req.headers?.authorization?.split(' ')[1];
        const isAuthenticated = await authenticateToken(tokenSecret);
        if (!isAuthenticated) {
          throw new GraphQLError(COMMON.INVALID_OR_EXPIRED_TOKEN, {
            extensions: { code: '401' },
          });
        }
        if (isAuthenticated.role === 'admin') {
          throw new GraphQLError('You are not authorized to update event', {
            extensions: { code: '401' },
          });
        }

        const eventForUserId = await Event.findById(id).populate('user').exec();
        if (isAuthenticated?.id !== eventForUserId?.user_id.toString()) {
          throw new GraphQLError(
            'You are not authorized to perform this Query'
          );
        }

        if (event?.guide_lines) {
          event.guide_lines.map((item) => {
            if (item.type === 'mcq') {
              if (item?.mcq_question_list?.length) {
                if (
                  item.mcq_question_list.length === 2 ||
                  item.mcq_question_list.length === 4
                ) {
                  return;
                } else if (
                  item.mcq_question_list.length < 2 ||
                  item.mcq_question_list.length > 4
                ) {
                  throw new GraphQLError(
                    'MCQ options length must be minimum 2 and maximum 4.'
                  );
                }

                if (hasDuplicates(item.mcq_question_list)) {
                  throw new GraphQLError(
                    'Duplicate values found in MCQ Option Lists'
                  );
                }

                if (item.correct_answer) {
                  for (const option of item.mcq_question_list) {
                    if (option.value === item.correct_answer) {
                      return;
                      break;
                    }
                  }
                  throw new GraphQLError(
                    'Answer is not matching with given options'
                  );
                } else {
                  throw new GraphQLError('Correct answer is required');
                }
              } else {
                throw new GraphQLError('MCQ options are required');
              }
            }
          });
        }

        const { error } = validationSchema.validate(event, {
          allowUnknown: true,
        });
        if (error) {
          throw new GraphQLError(error.message);
        }

        const eventData = {
          ...event,
        };

        const updatedEvent = await Event.findByIdAndUpdate(id, eventData, {
          new: true,
        }).populate('user');

        const user_id = isAuthenticated?.id;
        const user = await User.findById(user_id);
        if (!user) {
          throw new GraphQLError(COMMON.INVALID_OR_EXPIRED_TOKEN, {
            extensions: { code: '401' },
          });
        }
        // Create Sharable Link
        updatedEvent[
          'sharable_link'
        ] = `${FRONTEND_URL}${user?.organization}/${id}`;

        if (updatedEvent) {
          return {
            status: 0,
            message: 'Event updated successfully.',
            data: updatedEvent,
          };
        } else {
          return {
            status: 1,
            message: 'Event Not Found',
            data: null,
          };
        }
      } catch (error) {
        throw new GraphQLError(error);
      }
    },

    /*
     * Delete Event
     */
    deleteEvent: async (_, { id }, { req }) => {
      try {
        const tokenSecret = req.headers?.authorization?.split(' ')[1];
        const isAuthenticated = await authenticateToken(tokenSecret);
        if (isAuthenticated.role === 'admin') {
          throw new GraphQLError('You are not authorized to delete event', {
            extensions: { code: '401' },
          });
        }
        if (!isAuthenticated) {
          throw new GraphQLError(COMMON.INVALID_OR_EXPIRED_TOKEN, {
            extensions: { code: '401' },
          });
        }
        const event = await Event.findByIdAndDelete(id);
        if (event) {
          return {
            status: 0,
            message: 'Event deleted successfully.',
          };
        } else {
          return {
            status: 1,
            message: 'Event Not Found or already deleted.',
          };
        }
      } catch (error) {
        return new GraphQLError(error);
      }
    },

    /*
     * Reordering the GuideLines
     */
    reorderGuideLines: async (parent, { eventId, guide_lines }) => {
      try {
        // Fetch existing guidelines based on the eventId
        const existingEvent = await Event.findById(eventId);
        if (!existingEvent) {
          throw new GraphQLError('Event not found.');
        }

        if (!(existingEvent.guide_lines.length === guide_lines.length)) {
          throw new GraphQLError('Guideline length mismatch.');
        }

        // Create a mapping of guide_line IDs to the corresponding seq_id
        const seqIdMap = {};
        guide_lines.forEach((q) => {
          seqIdMap[q._id] = q.seq_id;
        });

        // Reorder the existing guide_lines based on the seq_id from the client
        existingEvent.guide_lines.sort(
          (a, b) => seqIdMap[a._id.toString()] - seqIdMap[b._id.toString()]
        );

        // Update the seq_id of each guidelines in the event
        existingEvent?.guide_lines.forEach((guide_line) => {
          const guideLineId = guide_line._id.toString(); // Convert the ObjectID to a string
          guide_line.seq_id = seqIdMap[guideLineId]; // Update the seq_id based on the new order
        });

        const updatedEvent = await Event.findByIdAndUpdate(
          eventId,
          existingEvent,
          {
            new: true,
          }
        );

        // Return the reordered data to the client
        if (updatedEvent) {
          return {
            status: 0,
            message: 'Guidelines reordered successfully.',
            data: updatedEvent,
          };
        } else {
          return {
            status: 1,
            message: 'Something went wrong',
            data: null,
          };
        }
      } catch (error) {
        throw new Error('Failed to reorder guide_lines: ' + error.message);
      }
    },
  },
  Event: {
    /*
     * Fetch User data
     */
    user: async (parent) => {
      try {
        const user = await User.findById(parent.user_id);
        if (!user) {
          throw new GraphQLError(COMMON.USER_NOT_FOUND);
        }
        return user;
      } catch (error) {
        throw new GraphQLError(error);
      }
    },
  },
};
export default eventResolver;
