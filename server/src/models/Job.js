const mongoose = require("mongoose");

const { MESSAGES } = require("../utils/messages/mongooseMessages");

const jobSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Business',
        required: [true, MESSAGES.Job.owner.required],
    },
    title: {
        type: String,
        required: [true, MESSAGES.Job.title.required],
        minLength: [5, MESSAGES.Job.title.length],
        maxLength: [150, MESSAGES.Job.title.length],
    },
    description: {
        type: String,
        required: [true, MESSAGES.Job.description.required],
        minLength: [50, MESSAGES.Job.description.length],
        maxLength: [1500, MESSAGES.Job.description.length],
    },
    salary: {
        type: String,
        default: null
    },
    location: {
        type: String,
        default: null,
    },
    experience: {
        type: String,
        default: null
    },
    fullyRemote: {
        type: Boolean,
        default: false
    },
    homeWork: {
        type: Boolean,
        default: false
    },
    level: {
        type: String,
        enum: ['entry-level', "junior-level", "mid-level", "senior-level", "management", null],
        default: null,
    },
    applies: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    allTimeWork: {
        type: Boolean,
        default: false
    },
    fullTime: {
        type: Boolean,
        default: false
    },
    flexibleTime: {
        type: Boolean,
        default: false
    },
    vacation: {
        type: String,
        default: false
    },
    language: {
        type: [String],
        default: []
    },
    remoteInterview: {
        type: Boolean,
        default: false,
    },
    suitsNoExperience: {
        type: Boolean,
        default: false,
    },
    tech: {
        type: [String],
        enum: ["angular",
            "aws",
            "azure",
            "c#",
            "c++",
            "django",
            "docker",
            "flask",
            "flutter",
            "gcp",
            "go",
            "graphql",
            "java",
            "javascript",
            "kotlin",
            "kubernetes",
            "laravel",
            "mongodb",
            "mysql",
            "nextjs",
            "nodejs",
            "nuxtjs",
            "php",
            "postgresql",
            "python",
            "reactjs",
            "redis",
            "rubyonrails",
            "rust",
            "spring",
            "sql",
            "swift",
            "symfony",
            "typescript",
            "vuejs",
            null
        ],
        default: null,
    },
    isAccepted: {
        type: Boolean,
        default: false,
        required: [true, MESSAGES.Job.isAccepted.required]
    },
    hasEdit: {
        type: Boolean,
        default: false,
        required: [true, MESSAGES.Job.hasEdit.required]
    },
    isActive: {
        type: Boolean,
        default: true,
        required: [true, MESSAGES.Job.isActive.required]
    }

}, { timestamps: true });

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;