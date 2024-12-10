import React from "react";
import ComplaintCard from "../components/ComplaintCard";
import Filters from "../components/Filters";
import { Box, Button, Stack } from "@mui/material";
import { useState,useEffect } from "react";


export default function AllComplaints() {
  const [complaints,setComplaints]=useState(dummyComplaints)
  const [category,setCategory]=useState("");
  useEffect(()=>{
    console.log(category)
    if(category==="")
    {
      setComplaints(dummyComplaints)
    }
    else
    {
      setComplaints(dummyComplaints.filter((item)=>item.hashTag==category))
    }
  },[category])
  return (
    <>
      <Stack sx={{width:"100%"}}>
        <Stack direction="row" sx={{display:"flex",alignItems:"center",justifyContent:'space-between'}}>
        <Filters setCategory={setCategory}/>
        <Button variant="contained"
        color="secondary">Mark all {category} complaints as Completed</Button>
        </Stack>
        
        <Box sx={{ mt: 1 }}>
          <Stack spacing={1}>
            {complaints.map((ele, index) => (
              <ComplaintCard complaints={ele} key={index} index={index} />
            ))}
          </Stack>
        </Box>
      </Stack>
    </>
  );
}


const dummyComplaints = [
  // Timeliness
  {
    hashTag: "timeliness",
    shortMsg: "Late food serving",
    mess: "Mess 1",
    desc: "The food is often served late, causing inconvenience to many students. The serving time should be strictly adhered to for better meal planning.",
    status: "Pending",
    img: "https://nsom.ac.in/img/facilities/canteen/1.jpg"
  },
  {
    hashTag: "timeliness",
    shortMsg: "Delayed breakfast service",
    mess: "Mess 2",
    desc: "Breakfast is often served later than the scheduled time, affecting the students' morning routine.",
    status: "Done",
    img: "https://nsom.ac.in/img/facilities/canteen/1.jpg"
  },

  // Neatness/Cleanliness (tables, surroundings)
  {
    hashTag: "neatness_cleanliness",
    shortMsg: "Dirty tables",
    mess: "Mess 1",
    desc: "The tables are not cleaned properly after each meal. This leaves the mess looking untidy and unappealing.",
    status: "In Review",
    img: "https://nsom.ac.in/img/facilities/canteen/1.jpg"
  },
  {
    hashTag: "neatness_cleanliness",
    shortMsg: "Unclean surroundings",
    mess: "Mess 2",
    desc: "The surroundings of the mess area are often dirty, with trash on the floors and around the seating areas.",
    status: "Pending",
    img: "https://nsom.ac.in/img/facilities/canteen/1.jpg"
  },

  // Food Quality
  {
    hashTag: "food_quality",
    shortMsg: "Low food quality",
    mess: "Mess 1",
    desc: "The food quality has been declining. The ingredients used are not fresh, and the meals lack flavor.",
    status: "In Review",
    img: "https://nsom.ac.in/img/facilities/canteen/1.jpg"
  },
  {
    hashTag: "food_quality",
    shortMsg: "Unappetizing food",
    mess: "Mess 2",
    desc: "The food served is not visually appealing, and its taste does not match the expectation of a good meal.",
    status: "Done",
    img: "https://nsom.ac.in/img/facilities/canteen/1.jpg"
  },

  // Taste of Curries
  {
    hashTag: "taste_of_curries",
    shortMsg: "Bland curries",
    mess: "Mess 1",
    desc: "The curries lack taste and seasoning. They are often too bland and need improvement.",
    status: "In Review",
    img: "https://nsom.ac.in/img/facilities/canteen/1.jpg"
  },
  {
    hashTag: "taste_of_curries",
    shortMsg: "Overcooked curries",
    mess: "Mess 2",
    desc: "The curries are sometimes overcooked, resulting in a soggy and unappetizing texture.",
    status: "Done",
    img: "https://nsom.ac.in/img/facilities/canteen/1.jpg"
  },

  // Snacks, Tea, Coffee, and Breakfast
  {
    hashTag: "snacks_tea_coffee_breakfast",
    shortMsg: "Stale snacks",
    mess: "Mess 1",
    desc: "The snacks provided are often stale and not fresh. This affects the overall experience of the meal.",
    status: "Done",
    img: "https://nsom.ac.in/img/facilities/canteen/1.jpg"
  },
  {
    hashTag: "snacks_tea_coffee_breakfast",
    shortMsg: "Cold tea and coffee",
    mess: "Mess 2",
    desc: "Tea and coffee are often served cold, which diminishes the overall enjoyment of these beverages.",
    status: "In Review",
    img: "https://nsom.ac.in/img/facilities/canteen/1.jpg"
  },

  // Quantity of Food as per Menu
  {
    hashTag: "quantity_of_food",
    shortMsg: "Insufficient food quantity",
    mess: "Mess 1",
    desc: "The quantity of food served is often insufficient, leaving students unsatisfied and hungry.",
    status: "Done",
    img: "https://nsom.ac.in/img/facilities/canteen/1.jpg"
  },
  {
    hashTag: "quantity_of_food",
    shortMsg: "Overestimated food portion",
    mess: "Mess 2",
    desc: "The portions of food served are sometimes too large, leading to food wastage. A balanced portion size would be more appropriate.",
    status: "In Review",
    img: "https://nsom.ac.in/img/facilities/canteen/1.jpg"
  },

  // Employee Courtesy
  {
    hashTag: "employee_courtesy",
    shortMsg: "Rude employees",
    mess: "Mess 1",
    desc: "Some employees at the mess are often rude and do not interact politely with students. A more respectful approach is needed.",
    status: "In Review",
    img: "https://nsom.ac.in/img/facilities/canteen/1.jpg"
  },
  {
    hashTag: "employee_courtesy",
    shortMsg: "Unfriendly staff",
    mess: "Mess 2",
    desc: "The staff members seem unfriendly and lack the necessary customer service skills. They should be more approachable and courteous.",
    status: "Done",
    img: "https://nsom.ac.in/img/facilities/canteen/1.jpg"
  },

  // Uniform Wearing by Employees
  {
    hashTag: "uniform_wearing",
    shortMsg: "Improper uniform",
    mess: "Mess 1",
    desc: "Some employees do not wear their uniforms properly, which affects the professional image of the mess.",
    status: "Done",
    img: "https://nsom.ac.in/img/facilities/canteen/1.jpg"
  },
  {
    hashTag: "uniform_wearing",
    shortMsg: "Lack of uniforms",
    mess: "Mess 2",
    desc: "Some employees are not wearing uniforms at all, which is not acceptable in a professional setting.",
    status: "In Review",
    img: "https://nsom.ac.in/img/facilities/canteen/1.jpg"
  },

  // Cooking as per Menu
  {
    hashTag: "cooking_as_per_menu",
    shortMsg: "Menu mismatch",
    mess: "Mess 1",
    desc: "The food served often does not match the items listed on the menu. This creates confusion and disappointment among students.",
    status: "Done",
    img: "https://nsom.ac.in/img/facilities/canteen/1.jpg"
  },
  {
    hashTag: "cooking_as_per_menu",
    shortMsg: "Incomplete meals",
    mess: "Mess 2",
    desc: "The meals are sometimes incomplete, lacking important components such as side dishes or salads that are part of the menu.",
    status: "In Review",
    img: "https://nsom.ac.in/img/facilities/canteen/1.jpg"
  },

  // Cleanliness of Wash Basins and Wash Area
  {
    hashTag: "cleanliness_of_wash_basins",
    shortMsg: "Dirty wash basins",
    mess: "Mess 1",
    desc: "The wash basins in the mess are often dirty and not cleaned regularly, which creates an unpleasant environment.",
    status: "Done",
    img: "https://nsom.ac.in/img/facilities/canteen/1.jpg"
  },
  {
    hashTag: "cleanliness_of_wash_basins",
    shortMsg: "Unclean wash area",
    mess: "Mess 2",
    desc: "The wash area where students clean their plates is not cleaned properly, and it often looks unhygienic.",
    status: "In Review",
    img: "https://nsom.ac.in/img/facilities/canteen/1.jpg"
  },

  // Others
  {
    hashTag: "others",
    shortMsg: "Seating issues",
    mess: "Mess 1",
    desc: "There are not enough seating arrangements in the mess during peak hours, causing students to wait or eat standing up.",
    status: "In Review",
    img: "https://nsom.ac.in/img/facilities/canteen/1.jpg"
  },
  {
    hashTag: "others",
    shortMsg: "Food availability",
    mess: "Mess 2",
    desc: "There are often issues with food availability, especially during late hours. Some items run out too quickly.",
    status: "Done",
    img: "https://nsom.ac.in/img/facilities/canteen/1.jpg"
  },
];

