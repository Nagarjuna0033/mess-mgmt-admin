import * as React from 'react';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Copyright from '../internals/components/Copyright';
import StatCard from '../components/StatCard';
import TotalComplaintsBarChart from '../components/graphs/TotalComplaintsBarChart';
import TopIssuesCard from '../components/TopIssuesCard';
import MenuCard from '../components/TodayMenu';
import OfficialDetailsCard from '../components/OfficialDetailsCard';
import MessInchargeDetailsCard from "../components/MessInchargeDetailsCard"


const getTrend=(value)=>{
  if(value>300) return "up";
  else if(value>100 && value<=300) return "neutral";
  else return "down"
}
const data = [
  {
    title: 'Complaints',
    value: '524',
    interval: 'Last 30 days',
    trend:getTrend('524'),
    data: [
      200, 24, 220, 260, 240, 380, 100, 240, 280, 240, 300, 340, 320, 360, 340, 380,
      360, 400, 380, 420, 400, 640, 340, 460, 440, 480, 460, 600, 880, 920,
    ],
  }
];

const menu = {
  Breakfast: "Dosa, Palli chutney, Karam chutney",
  Afternoon: "Colour Rice, Chicken, Paneer",
  Snacks: "Milk, Coffee, Tea, Groundnut",
  Night: "Rice, Sambar, Alu",
};

const messDetails = [
  { messName: "Mess 1", inchargeName: "John Doe", phone: "1234567890" },
  { messName: "Mess 2", inchargeName: "Jane Smith", phone: "9876543210" },
  { messName: "Mess 3", inchargeName: "Mike Johnson", phone: "4561237890" },
  { messName: "Mess 4", inchargeName: "Emily Davis", phone: "7894561230" },
  { messName: "Mess 1", inchargeName: "John Doe", phone: "1234567890" },
  { messName: "Mess 2", inchargeName: "Jane Smith", phone: "9876543210" },
  { messName: "Mess 3", inchargeName: "Mike Johnson", phone: "4561237890" },
  { messName: "Mess 4", inchargeName: "Emily Davis", phone: "7894561230" },
  { messName: "Mess 1", inchargeName: "John Doe", phone: "1234567890" },
  { messName: "Mess 2", inchargeName: "Jane Smith", phone: "9876543210" },
  { messName: "Mess 3", inchargeName: "Mike Johnson", phone: "4561237890" },
  { messName: "Mess 4", inchargeName: "Emily Davis", phone: "7894561230" },
];

const issues = [
  { name: "Remove Upma From Menu", upvotes: 920, downvotes: 0 },
  { name: "Want Biryani On Sunday", upvotes: 870, downvotes: 10 },
  { name: "Hot Water in Mess", upvotes: 180, downvotes: 20 },
  { name: "Remove Sambar", upvotes: 420, downvotes: 40 },
  { name: "Sunday Dosa Long Line", upvotes: 1870, downvotes: 10 },
];

const officials = [
  { name: "John Doe", designation: "Director", email: "director@example.com", phone: "123-456-7890" },
  { name: "Jane Smith", designation: "AO", email: "ao@example.com", phone: "098-765-4321" },
  { name: "Alice Johnson", designation: "Chief Mess Coordinator", email: "mess@example.com", phone: "567-890-1234" },
  { name: "Robert Brown", designation: "Faculty", email: "faculty@example.com", phone: "678-123-4567" },
];

export default function Home() {
  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
      {/* cards */}
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Overview
      </Typography>
      <Grid
        container
        spacing={2}
        columns={12}
        sx={{ mb: (theme) => theme.spacing(2) }}
      >
        {data.map((card, index) => (
          <Grid key={index} size={{ xs: 12, sm: 6, lg: 4 }}>
            <StatCard {...card} />
          </Grid>
        ))}
        
        <Grid size={{ xs: 12, md: 8 }}>
          <TotalComplaintsBarChart/>
          
        </Grid>
      </Grid>
      <Grid
        container
        spacing={2}
        columns={12}
        sx={{ mb: (theme) => theme.spacing(2) }}
      >
        <Grid size={{ xs: 12, md: 8 }}>
        <TopIssuesCard issues={issues}/>
          
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
        <MenuCard menu={menu}/>
          
        </Grid>
      </Grid>
      <Grid
        container
        spacing={2}
        columns={12}
        sx={{ mb: (theme) => theme.spacing(2) }}
      >
        <Grid size={{ xs: 12, md: 4 }}>
        
        <OfficialDetailsCard officials={officials}/>
        </Grid>
        <Grid size={{ xs: 12, md: 8 }}>
        <MessInchargeDetailsCard messDetails={messDetails}/>
          
        </Grid>
      </Grid>
      
      
      <Copyright sx={{ my: 4 }} />
    </Box>
  );
}
