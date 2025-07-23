exports.MESSAGES = {
    email: {
        required: "Email is required",
        length: "Email must be between 3 and 50 characters",
        invalidFormat: "Invalid email format"
    },
    userModel: {
        role: {
            required: "Role is required",
        },
        phone: {
            required: "Phone number is required",
            validatorMessage: "Phone must start with +<countrycode> or 0 and contain at least 6 digits",
        },
        firstName: {
            required: "First name is required",
            length: "First name must be between 3 and 30 characters",
        },
        lastName: {
            required: "Last name is required",
            length: "Last name must be between 3 and 30 characters",
        },
        isSetup: {
            required: "isSetup is required",
        },
        hasBusinessApplication: {
            required: "hasBusinessApplication is required"
        },
        isApproved: {
            required: "isApproved is required"
        }
    },
    LoginCode: {
        code: {
            required: "Code is required"
        }
    },
    Business: {
        owner: {
            required: "Business owner is required"
        },
        businessName: {
            required: "Business name is required",
            length: "Business name must be between 5 and 50 characters"
        },
        bio: {
            length: "Business bio must be up to 500 characters"
        },
        employeeCount: {
            length: "Employee count must be atleast 1"
        }
    },
    Job: {
        title: {
            required: "Title is required",
            length: "Title must be between 5 and 150 characters long",
        },
        description: {
            required: "Description is required",
            length: "Description must be between 50 and 1500 characters long",
        },
        salary:{
            minValue: "Salary must be positive value"
        },
        isActive:{
            required:"isActive is required"
        }
    }
}