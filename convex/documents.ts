import { v } from 'convex/values'
//
import { mutation, query } from './_generated/server'

// Create a new document
export const create = mutation({
  args: {
    title: v.string(),
    parentDocument: v.optional(v.id('documents')),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) throw new Error('Not authenticated')

    const userId = identity.subject

    const document = await ctx.db.insert('documents', {
      title: args.title,
      userId,
      parentDocument: args.parentDocument,
      isArchived: false,
      isPublished: false,
    })

    return document
  },
})

// Get all documents
export const getAll = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) throw new Error('Not authenticated')

    const userId = identity.subject

    const documents = await ctx.db.query('documents').collect()

    return documents
  },
})

// Get sidebar documents
export const getSidebar = query({
  args: { parentDocument: v.optional(v.id('documents')) },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) throw new Error('Not authenticated')

    const userId = identity.subject

    const documents = await ctx.db
      .query('documents')
      .withIndex('by_user_parent', (q) =>
        q.eq('userId', userId).eq('parentDocument', args.parentDocument)
      )
      .filter((doc) => doc.eq(doc.field('isArchived'), false))
      .order('desc')
      .collect()

    return documents
  },
})
