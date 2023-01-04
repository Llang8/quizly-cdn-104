const { GraphQLObjectType, GraphQLInputObjectType, GraphQLID, GraphQLString, GraphQLList, GraphQLInt, GraphQLFloat } = require('graphql')
const { Quiz, User, Question, Submission } = require('../models')

const UserType = new GraphQLObjectType({
    name: 'User',
    description: 'User type',
    fields: () => ({
        id: { type: GraphQLID },
        username: { type: GraphQLString },
        email: { type: GraphQLString },
        quizzes: {
            type: new GraphQLList(QuizType),
            resolve(parent, args) {
                return Quiz.find({
                    userId: parent.id
                })
            }
        },
        submissions: {
            type: new GraphQLList(SubmissionType),
            resolve(parent, args) {
                return Submission.find({
                    userId: parent.id
                })
            }
        }
    })
})

const QuizType = new GraphQLObjectType({
    name: 'Quiz',
    description: 'Quiz type',
    fields: () => ({
        id: { type: GraphQLID },
        slug: { type: GraphQLString },
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        userId: { type: GraphQLString },
        user: {
            type: UserType,
            resolve(parent, args) {
                return User.findById(parent.userId)
            }
        },
        questions: {
            type: new GraphQLList(QuestionType),
            resolve(parent, args) {
                return Question.find({
                    quizId: parent.id
                })
            }
        },
        submissions: {
            type: new GraphQLList(SubmissionType),
            resolve(parent, args) {
                return Submission.find({
                    quizId: parent.id
                })
            }
        },
        avgScore: {
            type: GraphQLFloat,
            async resolve(parent, args) {
                const submissions = await Submission.find({ quizId: parent.id })

                let totalScore = 0

                for (const submission of submissions) {
                    totalScore += submission.score
                }

                return totalScore / submissions.length
            }
        }
    })
})

const QuestionType = new GraphQLObjectType({
    name: 'QuestionType',
    description: 'Question type',
    fields: () => ({
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        correctAnswer: { type: GraphQLString },
        order: { type: GraphQLInt },
        quizId: { type: GraphQLString }
    })
})

const QuestionInputType = new GraphQLInputObjectType({
    name: 'QuestionInputType',
    description: 'Question input type',
    fields: () => ({
        title: { type: GraphQLString },
        correctAnswer: { type: GraphQLString },
        order: { type: GraphQLInt }
    })
})

const AnswerInputType = new GraphQLInputObjectType({
    name: 'AnswerInputType',
    description: 'Answer input type',
    fields: () => ({
        questionId: { type: GraphQLString },
        answer: { type: GraphQLString }
    })
})

const SubmissionType = new GraphQLObjectType({
    name: 'SubmissionType',
    description: 'Submission Type',
    fields: () => ({
        id: { type: GraphQLID },
        userId: { type: GraphQLString },
        quizId: { type: GraphQLString },
        score: { type: GraphQLInt },
        user: {
            type: UserType,
            resolve(parent,args) {
                return User.findById(parent.userId)
            }
        },
        quiz: {
            type: QuizType,
            resolve(parent, args) {
                return Quiz.findById(parent.quizId)
            }
        }
    })
})

module.exports = {
    UserType,
    QuizType,
    QuestionType,
    QuestionInputType,
    AnswerInputType,
    SubmissionType
}