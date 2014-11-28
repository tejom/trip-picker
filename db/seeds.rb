# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

	
	@hot = Trait.create(name: "Hot")
	@cold = Trait.create(name: "Cold")
	@cheap = Trait.create(name: "Cheap")
	@expensive = Trait.create(name: "Expensive")
	@mountains = Trait.create(name: "Mountains")
	@beach = Trait.create(name: "Beach")
	@sunny = Trait.create(name: "Sunny")
	@museums= Trait.create(name: "Cultural Sights")
	@food = Trait.create(name: "Food")
	@hiking = Trait.create(name: "Hiking")
	@pizza = Trait.create(name: "Pizza")
	@bbq = Trait.create(name: "BBQ")
	@theatre = Trait.create(name: "Theatre")
	@surf = Trait.create(name: "Surf")
	@ski = Trait.create(name: "Skiing")
	@mildClimate = Trait.create(name: "Mild Climate")
	@scuba = Trait.create(name: "Scuba")
	@football = Trait.create(name: "Football")
	@horses = Trait.create(name: "Horse Back Riding")
	@history = Trait.create(name: "History")
	@bigCity = Trait.create(name: "Big City")
	@rural = Trait.create(name: "Rural")
	@college = Trait.create(name: "College")
	@nightlife =Trait.create(name: "Nightlife")
	@shopping = Trait.create(name: "Shopping")
	@fashion = Trait.create(name: "Fashion")
	@camping = Trait.create(name: "Camping")
	@fishing = Trait.create(name: "Fishing")
	@romantic = Trait.create(name: "Romantic")
	@wine = Trait.create(name: "Wine") 
	@themePark = Trait.create(name: "Theme Park") 


	@location = Location.create(name: "New York")
		Weight.create location_id: @location.id, trait_id: @expensive.id ,weight: 5
		Weight.create location_id: @location.id, trait_id: @museums.id ,weight: 5
		Weight.create location_id: @location.id, trait_id: @food.id ,weight: 5
		Weight.create location_id: @location.id, trait_id: @pizza.id ,weight: 5
		Weight.create location_id: @location.id, trait_id: @theatre.id ,weight: 5
		Weight.create location_id: @location.id, trait_id: @nightlife.id ,weight: 5
		Weight.create location_id: @location.id, trait_id: @bigCity.id ,weight: 5
		Weight.create location_id: @location.id, trait_id: @shopping.id ,weight: 5
		Weight.create location_id: @location.id, trait_id: @fashion.id ,weight: 5
		Weight.create location_id: @location.id, trait_id: @history.id ,weight: 5

	@location = Location.create(name: "Chicago")
		Weight.create location_id: @location.id, trait_id: @pizza.id ,weight: 5
		Weight.create location_id: @location.id, trait_id: @bigCity.id ,weight: 5


	@location = Location.create(name: "Los Angeles")
		Weight.create location_id: @location.id, trait_id: @hot.id ,weight: 5
		Weight.create location_id: @location.id, trait_id: @expensive.id ,weight: 4
		Weight.create location_id: @location.id, trait_id: @beach.id ,weight: 5
		Weight.create location_id: @location.id, trait_id: @sunny.id ,weight: 5
		Weight.create location_id: @location.id, trait_id: @shopping.id ,weight: 5
		Weight.create location_id: @location.id, trait_id: @hiking.id ,weight: 4
		Weight.create location_id: @location.id, trait_id: @nightlife.id ,weight: 4
		Weight.create location_id: @location.id, trait_id: @bigCity.id ,weight: 5
		Weight.create location_id: @location.id, trait_id: @surf.id ,weight: 4
		Weight.create location_id: @location.id, trait_id: @mountains.id ,weight: 3

	@location = Location.create(name: "Miami")
		Weight.create location_id: @location.id, trait_id: @hot.id ,weight: 5
		Weight.create location_id: @location.id, trait_id: @expensive.id ,weight: 4
		Weight.create location_id: @location.id, trait_id: @beach.id ,weight: 5
		Weight.create location_id: @location.id, trait_id: @bigCity.id ,weight: 3
		Weight.create location_id: @location.id, trait_id: @nightlife.id ,weight: 5
		Weight.create location_id: @location.id, trait_id: @shopping.id ,weight: 3
	@location =Location.create(name: "Dallas")
		Weight.create location_id: @location.id, trait_id: @hot.id ,weight: 5		
	@location = Location.create(name: "Denver")
		Weight.create location_id: @location.id, trait_id: @cold.id , weight: 3
