import mongoose, { Document, Schema, Types, model } from 'mongoose';

interface EventresultArrayProps {
  correct_answer: string;
  guideline_id: mongoose.Schema.Types.ObjectId;
}
interface EventResultProps extends Document {
  event_id: Types.ObjectId;
  event_result: EventresultArrayProps[];
  is_passed: boolean;
  is_qr_code_scanned: boolean;
  qr_code_number: string;
  qr_code_scanned_time: Date;
  createdAt: Date;
}

const eventModel = new Schema<EventResultProps>(
  {
    qr_code_number: {
      type: String,
      required: false,
    },
    is_passed: {
      type: Boolean,
      required: true,
      default: false,
    },
    event_result: {
      type: [
        {
          correct_answer: {
            type: String,
            required: true,
          },
          guideline_id: { type: mongoose.Types.ObjectId, required: true },
        },
      ],
      required: true,
    },
    event_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event',
      required: true,
    },
    is_qr_code_scanned: {
      type: Boolean,
      required: true,
      default: false,
    },
    qr_code_scanned_time: {
      type: Date,
      require,
    },
  },
  {
    timestamps: true,
  }
);

const EventResult = model<EventResultProps>('EventResult', eventModel);
export default EventResult;
