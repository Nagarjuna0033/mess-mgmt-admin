import React, { useState } from 'react';
import FeedbackBarChart from '../FeedBackBarChart';
import SendFeedbackNotification from "../../components/SendFeedBackNotification";
import { Grid2 } from '@mui/material';

export default function FeedBackAnalyticsGraph({ data }) {
    const [selectedMessIndex, setSelectedMessIndex] = useState(0);

    const handleDropdownChange = (e) => {
        setSelectedMessIndex(Number(e.target.value));
    };


    const average = data.map((item) => item.overallAverage);

    const getBestMess = () => {
        let max = 0;
        for (let i = 0; i < average.length; i++) {
            if (average[i] > average[max]) max = i;
        }
        return max;
    };

    // Extract yLabels based on the selected mess index
    const yLabels = Object.values(data[selectedMessIndex].categories);

    // Categorize the messes based on average rating
    const excellentMesses = data.filter(item => item.overallAverage > 4);
    const averageMesses = data.filter(item => item.overallAverage >= 2.5 && item.overallAverage <= 4);
    const worstMesses = data.filter(item => item.overallAverage < 2.5);

    // Function to format messages based on category
    const renderMessesCategory = (category, message) => {
        return category.length > 0 ? (
            category.map((mess, index) => (
                <div key={index} style={{ marginBottom: '10px' }}>
                    <strong>{mess.mess}</strong>: {mess.overallAverage}
                </div>
            ))
        ) : (
            <p>{message}</p>
        );
    };

    return (
        <>
            <h1 style={{
                fontSize: '24px',
                fontWeight: 'bold',
                textAlign: 'center',
                marginBottom: '20px',
            }}>
                {`Best Mess: ${data[getBestMess()].mess} with ${data[getBestMess()].overallAverage}`}
            </h1>

            <FeedbackBarChart
                title={"Over All Mess FeedBack"}
                xLabels={data.map((item) => item.mess)}
                yLabels={average}
                style={{
                    marginBottom: '30px', // Adds space below the chart
                }}
            />

            <h2 style={{
                fontSize: '20px',
                fontWeight: '600',
                marginBottom: '15px',
                textAlign: 'center',
                marginTop: '50px',
            }}>
                Mess wise Feedback
            </h2>

            <select
                onChange={handleDropdownChange}
                value={selectedMessIndex}
                style={{
                    padding: '12px',
                    fontSize: '16px',
                    borderRadius: '8px',
                    border: '1px solid #ddd',
                    marginBottom: '25px',
                    width: '100%',
                    maxWidth: '400px',
                    display: 'block',
                    margin: '0 auto',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    cursor: 'pointer',
                    transition: 'border-color 0.3s ease',
                }}
            >
                {data.map((mess, index) => (
                    <option key={index} value={index}>
                        {mess.mess}
                    </option>
                ))}
            </select>

            <FeedbackBarChart
                title={data[selectedMessIndex].mess}
                xLabels={ Object.keys(data[0].categories)}
                yLabels={yLabels}
                style={{
                    marginTop: '20px',
                }}
            />

            <Grid2 container spacing={3} sx={{ p: 3 }}>

                <Grid2 item xs={12} md={8}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        textAlign: 'center',
                    }}>
                        <div style={{ flex: 1, padding: '10px', border: '1px solid #ddd' }}>
                            <h3>Excellent Messes</h3>
                            {renderMessesCategory(excellentMesses, "Unfortunately, no good messes!")}
                        </div>

                        <div style={{ flex: 1, padding: '10px', border: '1px solid #ddd' }}>
                            <h3>Average Messes</h3>
                            {renderMessesCategory(averageMesses, "No Average messes")}
                        </div>

                        <div style={{ flex: 1, padding: '10px', border: '1px solid #ddd' }}>
                            <h3>Worst Messes</h3>
                            {renderMessesCategory(worstMesses, "It's good news, no worst messes!")}
                        </div>
                    </div>
                </Grid2>

                <Grid2 item xs={12} md={4}>
                    <SendFeedbackNotification />
                </Grid2>
            </Grid2>
        </>
    );
}
