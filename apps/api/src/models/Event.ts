import mongoose, { Schema, model, Document, Types } from 'mongoose';
export interface OptionListProps extends Document {
  value: string;
  label: string;
}

enum typeEnum {
  ShortText = 'short_text',
  MCQ = 'mcq',
}
export interface GuidLineProps {
  _id: mongoose.Schema.Types.ObjectId;
  type: typeEnum;
  title: string;
  body: string;
  correct_answer?: string;
  seq_id: number; // for placement of question
  mcq_question_list: OptionListProps[];
}

interface EventProps extends Document {
  name: string;
  location: string;
  date: Date;
  start_time: string;
  guide_lines: GuidLineProps[];
  user_id: Types.ObjectId;
  sharable_link: string;
}

const arrayLengthValidator = (arr: OptionListProps[]): boolean => {
  if (!arr || !arr.length) {
    return true; // Array field is not present, validation passes
  }
  return arr.length >= 2 && arr.length <= 4;
};

const guideLinesSchema = new Schema({
  seq_id: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: Object.values(typeEnum),
  },
  title: {
    type: String,
    required: function (this: GuidLineProps) {
      return this.type === 'short_text' || this.type === 'mcq';
    },
  },
  body: {
    type: String,
    required: function (this: GuidLineProps) {
      return this.type === 'short_text' && this.title !== undefined;
    },
  },
  correct_answer: {
    type: String,
    required: function (this: GuidLineProps) {
      return this.type === 'mcq';
    },
  },
  mcq_question_list: {
    type: [
      {
        value: {
          type: String,
          required: true,
        },
        label: {
          type: String,
          required: true,
        },
      },
    ],
    required: function (this: GuidLineProps) {
      return this.type === 'mcq';
    },
    validate: [
      {
        validator: arrayLengthValidator,
        message: 'MCQ options length must be minimum 2 and maximum 4.',
      },
    ],
  },
});

const eventModel = new Schema<EventProps>(
  {
    name: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: false,
    },
    date: {
      type: Date,
      required: false,
    },
    start_time: {
      type: String,
      required: false,
    },
    guide_lines: {
      type: [guideLinesSchema],
      required: true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Event = model<EventProps>('Event', eventModel);
export default Event;
