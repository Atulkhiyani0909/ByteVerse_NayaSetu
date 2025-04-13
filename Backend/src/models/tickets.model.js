import mongoose from 'mongoose'

const { Schema } = mongoose;

const ticketSchema = new Schema({
    title: {
        type: String,
        required: true,
    },

    department: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["Solved", "Pending", "Rejected"],
        default: "Pending"
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    evidence: {
        type: String
    },

    owner: {
        // type: Schema.Types.ObjectId || String,
        type: String,
        ref: "User"
    },
    evidence: {
        type: String
    },
    officerName: {
        type: String
    },
    location: {
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        }
    },
    isAnonymously: {
        type: Boolean,
        default: false
    }

}, {
    timestamps: true
})

const Ticket = mongoose.model('Ticket', ticketSchema);
export default Ticket