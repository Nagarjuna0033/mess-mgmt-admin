import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { BarChart } from '@mui/x-charts/BarChart';
import { useTheme } from '@mui/material/styles';

export default function TotalComplaintsBarChart() {
    const theme = useTheme();
    const colorPalette = [
        (theme.vars || theme).palette.primary.dark,
        (theme.vars || theme).palette.primary.main,
        (theme.vars || theme).palette.primary.light,
    ];

    return (
        <Card variant="outlined" sx={{ width: '100%' }}>
            <CardContent>
                <Typography component="h2" variant="subtitle2" gutterBottom>
                    Category Wise Complaints
                </Typography>

                <BarChart
                    borderRadius={8}
                    colors={colorPalette}
                    xAxis={[
                        {
                            scaleType: 'band',
                            categoryGapRatio: 0.5,
                            data: [
                                'Timeliness',
                                'Neatness/cleanliness',
                                'Food quality',
                                'Taste of curries',
                                'Snacks And Breakfast',
                                'Quantity of food',
                                'Employee courtesy',
                                'Uniform wearing',
                                'Cooking as per menu',
                                'Cleanliness of wash area',
                                'Others'
                            ]
                        },
                    ]}
                    series={[

                        {
                            id: 'solved_complaints',
                            label: 'Solved Complaints',
                            data: [25, 10, 15, 5, 20, 10, 35, 15, 10, 7, 7], // Solved complaints for each category
                            stack: 'A',
                        },
                        {
                            id: 'pending_complaints',
                            label: 'Pending Complaints',
                            data: [5, 3, 5, 2, 10, 2, 5, 8, 5, 3, 3], // Pending complaints for each category
                            stack: 'A',
                        },
                    ]}
                    height={250}
                    margin={{ left: 50, right: 0, top: 20, bottom: 20 }}
                    grid={{ horizontal: true }}
                    slotProps={{
                        legend: {
                            hidden: true,
                        },
                    }}
                />
            </CardContent>
        </Card>
    );
}
