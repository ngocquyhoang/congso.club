# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160218092135) do

  create_table "admins", force: :cascade do |t|
    t.string   "name",               limit: 255
    t.string   "address",            limit: 255
    t.string   "phone",              limit: 255
    t.string   "nickname",           limit: 255
    t.string   "gender",             limit: 255
    t.string   "age",                limit: 255
    t.string   "role",               limit: 255
    t.string   "email",              limit: 255, default: "", null: false
    t.string   "encrypted_password", limit: 255, default: "", null: false
    t.integer  "sign_in_count",      limit: 4,   default: 0
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip", limit: 255
    t.string   "last_sign_in_ip",    limit: 255
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "contacts", force: :cascade do |t|
    t.text     "name",       limit: 65535
    t.text     "email",      limit: 65535
    t.datetime "created_at",               null: false
    t.datetime "updated_at",               null: false
  end

  create_table "friendly_id_slugs", force: :cascade do |t|
    t.string   "slug",           limit: 255, null: false
    t.integer  "sluggable_id",   limit: 4,   null: false
    t.string   "sluggable_type", limit: 50
    t.string   "scope",          limit: 255
    t.datetime "created_at"
  end

  add_index "friendly_id_slugs", ["slug", "sluggable_type", "scope"], name: "index_friendly_id_slugs_on_slug_and_sluggable_type_and_scope", unique: true, using: :btree
  add_index "friendly_id_slugs", ["slug", "sluggable_type"], name: "index_friendly_id_slugs_on_slug_and_sluggable_type", using: :btree
  add_index "friendly_id_slugs", ["sluggable_id"], name: "index_friendly_id_slugs_on_sluggable_id", using: :btree
  add_index "friendly_id_slugs", ["sluggable_type"], name: "index_friendly_id_slugs_on_sluggable_type", using: :btree

  create_table "messages", force: :cascade do |t|
    t.text     "name",       limit: 65535
    t.text     "mail",       limit: 65535
    t.text     "message",    limit: 65535
    t.datetime "created_at",               null: false
    t.datetime "updated_at",               null: false
  end

  create_table "offices", force: :cascade do |t|
    t.text     "title",      limit: 65535
    t.text     "owner",      limit: 65535
    t.text     "image",      limit: 65535
    t.text     "slug",       limit: 65535
    t.integer  "like",       limit: 4,     default: 0, null: false
    t.integer  "view",       limit: 4,     default: 0, null: false
    t.datetime "created_at",                           null: false
    t.datetime "updated_at",                           null: false
  end

  create_table "user_images", force: :cascade do |t|
    t.text     "name",         limit: 65535
    t.text     "email",        limit: 65535
    t.text     "title",        limit: 65535
    t.text     "noted",        limit: 65535
    t.text     "image_upload", limit: 65535
    t.text     "image_link",   limit: 65535
    t.text     "image_idea",   limit: 65535
    t.boolean  "dev_readed",                 default: false
    t.datetime "created_at",                                 null: false
    t.datetime "updated_at",                                 null: false
  end

  create_table "view_pages", force: :cascade do |t|
    t.integer  "home_page",              limit: 4, default: 0, null: false
    t.integer  "zorba_page",             limit: 4, default: 0, null: false
    t.integer  "contact_page",           limit: 4, default: 0, null: false
    t.integer  "contributed_image_page", limit: 4, default: 0, null: false
    t.datetime "created_at",                                   null: false
    t.datetime "updated_at",                                   null: false
  end

end
