import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
} from 'graphql'
import fetch from 'isomorphic-fetch'

const BlogType = new GraphQLObjectType({
    name: 'blog',
    fields: () => ({
        id: {type: GraphQLInt},
        userId: {type: GraphQLInt},
        title: {type: GraphQLString},
        body: {type: GraphQLString},
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        blog: {
            type: BlogType,
            args: {
                id: {type: GraphQLInt}
            },
            resolve(parentValue, args) {
                return fetch('https://jsonplaceholder.typicode.com/posts/' + args.id)
                    .then(function (response) {
                        if (response.status >= 400) {
                            throw new Error("Bad response from server");
                        }
                        return response.json();
                    })
            }
        },
        blogList: {
            type: new GraphQLList(BlogType),
            resolve(parentValue, args) {
                return fetch('https://jsonplaceholder.typicode.com/posts')
                    .then(function (response) {
                        if (response.status >= 400) {
                            throw new Error("Bad response from server");
                        }
                        return response.json();
                    })
            }
        }
    }
})

let schema = new GraphQLSchema({
    query: RootQuery,
});

export default schema;