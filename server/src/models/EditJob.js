const mongoose = require("mongoose");

const { MESSAGES } = require("../utils/messages/mongooseMessages");

const editJobSchema = new mongoose.Schema({
    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job',
        required: [true],
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
        type: [String],
        enum: ['entry-level', "junior-level", "mid-level", "senior-level", "management", null],
        default: null,
    },
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
    languages: {
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
            "csharp",
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

}, { timestamps: true });

const EditJob = mongoose.model("EditJob", editJobSchema);

module.exports = EditJob;