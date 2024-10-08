import { v } from 'convex/values'
//
import { Doc, Id } from './_generated/dataModel'
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

// Archive a document
export const archive = mutation({
  args: { id: v.id('documents') },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) throw new Error('Not authenticated')

    const userId = identity.subject

    const document = await ctx.db.get(args.id)
    if (!document) throw new Error('Document not found')

    if (document.userId !== userId) throw new Error('Not authenticated')

    // Recursively archive all children
    const archiveChildren = async (document: any) => {
      const children = await ctx.db
        .query('documents')
        .withIndex('by_user_parent', (q) =>
          q.eq('userId', userId).eq('parentDocument', document._id)
        )
        .collect()

      for (const child of children) {
        await archiveChildren(child)
        await ctx.db.patch(child._id, { isArchived: true })
      }
    }

    const newDoc = await ctx.db.patch(args.id, { isArchived: true })

    return newDoc
  },
})

// Get archived documents
export const getArchived = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) throw new Error('Not authenticated')

    const userId = identity.subject

    const documents = await ctx.db
      .query('documents')
      .withIndex('by_user', (q) => q.eq('userId', userId))
      .filter((doc) => doc.eq(doc.field('isArchived'), true))
      .order('desc')
      .collect()

    return documents
  },
})

// Restore a document
export const restore = mutation({
  args: { id: v.id('documents') },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) throw new Error('Not authenticated')

    const userId = identity.subject

    const document = await ctx.db.get(args.id)
    if (!document) throw new Error('Document not found')

    if (document.userId !== userId) throw new Error('Not authenticated')

    // Recursively restore all children
    const restoreChildren = async (docId: Id<'documents'>) => {
      const children = await ctx.db
        .query('documents')
        .withIndex('by_user_parent', (q) =>
          q.eq('userId', userId).eq('parentDocument', docId)
        )
        .collect()

      for (const child of children) {
        await ctx.db.patch(child._id, { isArchived: false })
        await restoreChildren(child._id)
      }
    }

    const options: Partial<Doc<'documents'>> = {
      isArchived: false,
    }

    if (document.parentDocument) {
      const parent = await ctx.db.get(document.parentDocument)
      if (parent?.isArchived) {
        options.parentDocument = undefined
      }
    }

    const newDoc = await ctx.db.patch(args.id, options)
    restoreChildren(args.id)

    return newDoc
  },
})

// Delete a document
export const remove = mutation({
  args: { id: v.id('documents') },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) throw new Error('Not authenticated')

    const userId = identity.subject

    const document = await ctx.db.get(args.id)
    if (!document) throw new Error('Document not found')

    if (document.userId !== userId) throw new Error('Not authenticated')

    const newDoc = await ctx.db.delete(args.id)

    return newDoc
  },
})

// Get search results
export const getSearch = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) throw new Error('Not authenticated')

    const userId = identity.subject

    const documents = await ctx.db
      .query('documents')
      .withIndex('by_user', (q) => q.eq('userId', userId))
      .filter((doc) => doc.eq(doc.field('isArchived'), false))
      .order('desc')
      .collect()

    return documents
  },
})

// Get a document by ID
export const getById = query({
  args: { id: v.id('documents') },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()

    const document = await ctx.db.get(args.id)
    if (!document) throw new Error('Document not found')

    if (!document.isArchived && document.isPublished) {
      return document
    }

    if (!identity) throw new Error('Not authenticated')

    const userId = identity.subject
    if (document.userId !== userId) throw new Error('Not authenticated')

    return document
  },
})

// Update a document
export const update = mutation({
  args: {
    id: v.id('documents'),
    title: v.optional(v.string()),
    content: v.optional(v.string()),
    coverImage: v.optional(v.string()),
    icon: v.optional(v.string()),
    isPublished: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) throw new Error('Not authenticated')

    const userId = identity.subject
    const { id, ...rest } = args

    const document = await ctx.db.get(id)
    if (!document) throw new Error('Document not found')

    if (document.userId !== userId) throw new Error('Not authenticated')

    const newDoc = await ctx.db.patch(args.id, { ...rest })

    return newDoc
  },
})

// Remove icon from a document
export const removeIcon = mutation({
  args: { id: v.id('documents') },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) throw new Error('Not authenticated')

    const userId = identity.subject

    const document = await ctx.db.get(args.id)
    if (!document) throw new Error('Document not found')

    if (document.userId !== userId) throw new Error('Not authenticated')

    const newDoc = await ctx.db.patch(args.id, { icon: undefined })

    return newDoc
  },
})

// Remove cover image from a document
export const removeCoverImage = mutation({
  args: { id: v.id('documents') },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) throw new Error('Not authenticated')

    const userId = identity.subject

    const document = await ctx.db.get(args.id)
    if (!document) throw new Error('Document not found')

    if (document.userId !== userId) throw new Error('Not authenticated')

    const newDoc = await ctx.db.patch(args.id, { coverImage: undefined })

    return newDoc
  },
})
