import { relations } from 'drizzle-orm'
import { integer, pgTable, serial, text } from 'drizzle-orm/pg-core'

export const courses = pgTable('courses', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  imageSrc: text('image_src').notNull(),
})

export const coursesRelations = relations(courses, ({ many }) => ({
  userProgress: many(userProgress),
}))

export const userProgress = pgTable('user_progress', {
  userId: text('user_id').notNull().primaryKey(),
  userName: text('user_name').notNull().default('user'),
  userImageSrc: text('user_image_src').notNull().default('/mascot.svg'),
  activeId: integer('active_id').references(() => courses.id, {
    onDelete: 'cascade',
  }),
  hearts: integer('hearts').notNull().default(5),
  points: integer('points').notNull().default(0),
})

export const userProgressRelations = relations(userProgress, ({ one }) => ({
  activeCourse: one(courses, {
    fields: [userProgress.activeId],
    references: [courses.id],
  }),
}))