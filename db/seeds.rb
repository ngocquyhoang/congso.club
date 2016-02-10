# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
# createAdmin
Admin.create(name: 'Hoàng Ngọc Quý', address: 'Số 348 Mỹ Đình Hà Nội', phone: '0964 149 843', nickname: 'ngocquyhoang - Admin', gender: 'Nam', age: '23', role: 'Admin', email: 'admin@congso.com', password: 'Cbr1000r')
# create development
# Admin.create(name: 'Hoàng Ngọc Quý', address: 'Số 348 Mỹ Đình Hà Nội', phone: '0964 149 843', nickname: 'ngocquyhoang - Development', gender: 'Nam', age: '23', role: 'Development', email: 'ngocquyhoang.93@gmail.com', password: '')
