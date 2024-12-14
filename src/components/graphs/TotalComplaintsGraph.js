import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { useDrawingArea } from '@mui/x-charts/hooks';
import { styled } from '@mui/material/styles';
import { Stack, Typography, LinearProgress, linearProgressClasses } from '@mui/material';
import { colorsArray } from '../../utils/color';
import TotalComplaintsBarChart from "./TotalComplaintsBarChart";
import { getAllComplaints, convertComplaintsBasedOnCategory } from "../../api/getAllComplaints";
import { useEffect, useState } from 'react';

// Styled components for Text
const StyledText = styled('text', {
    shouldForwardProp: (prop) => prop !== 'variant',
})(({ theme }) => ({
    textAnchor: 'middle',
    dominantBaseline: 'central',
    fill: (theme.vars || theme).palette.text.secondary,
    variants: [
        {
            props: {
                variant: 'primary',
            },
            style: {
                fontSize: theme.typography.h5.fontSize,
            },
        },
        {
            props: ({ variant }) => variant !== 'primary',
            style: {
                fontSize: theme.typography.body2.fontSize,
            },
        },
        {
            props: {
                variant: 'primary',
            },
            style: {
                fontWeight: theme.typography.h5.fontWeight,
            },
        },
        {
            props: ({ variant }) => variant !== 'primary',
            style: {
                fontWeight: theme.typography.body2.fontWeight,
            },
        },
    ],
}));

// Component for Pie chart center label
function PieCenterLabel({ total, secondaryText }) {
    const { width, height, left, top } = useDrawingArea();
    
    const primaryY = top + height / 2 - 10;
    const secondaryY = primaryY + 24;

    return (
        <React.Fragment>
            <StyledText variant="primary" x={left + width / 2} y={primaryY}>
                {total}
            </StyledText>
            <StyledText variant="secondary" x={left + width / 2} y={secondaryY}>
                {secondaryText}
            </StyledText>
        </React.Fragment>
    );
}

// Reusable Pie component
function Pie({ data, secondaryText, total }) {
    return (
        <PieChart
            colors={colorsArray}
            margin={{
                left: 80,
                right: 80,
                top: 80,
                bottom: 80,
            }}
            series={[{
                data,
                innerRadius: 75,
                outerRadius: 100,
                paddingAngle: 0,
                highlightScope: { faded: 'global', highlighted: 'item' },
            }]}
            height={260}
            width={260}
            slotProps={{
                legend: { hidden: true },
            }}
        >
            <PieCenterLabel total={total} secondaryText={secondaryText} />
        </PieChart>
    );
}

function LinearProgressWithLabel({ label, value, total, color }) {
    return (
        <Stack sx={{ flexGrow: 1 }}>
            <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
                <Typography variant="body2" sx={{ fontWeight: '500' }}>
                    {value} Complaints
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {Math.round((value / total) * 100)}%
                </Typography>
            </Stack>
            <LinearProgress
                variant="determinate"
                value={Math.round((value / total) * 100)}
                sx={{
                    [`& .${linearProgressClasses.bar}`]: {
                        backgroundColor: color,
                    },
                }}
            />
        </Stack>
    );
}

export default function TotalComplaintsChart() {
    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(true);

    const getData = async () => {
        try {
            const complaintsData = await getAllComplaints();
            const categorizedData = convertComplaintsBasedOnCategory(complaintsData);
            setComplaints(categorizedData);
            console.log(categorizedData)
        } catch (error) {
            console.error("Error fetching complaints data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    if (loading) {
        return <Typography>Loading...</Typography>;
    }

    // Processed data for Pie chart and progress bars
    const complaints_data = complaints.map((item) => ({
        label: item.category,
        value: item.solved_complaints + item.pending_complaints
    }));

    const complaints_resolved = complaints.map((item) => ({
        label: item.category,
        value: item.solved_complaints
    }));

    const complaints_pending = complaints.map((item) => ({
        label: item.category,
        value: item.pending_complaints
    }));

    const total_complaints = complaints_data.reduce((acc, item) => acc + item.value, 0);
    const total_resolved_complaints = complaints_resolved.reduce((acc, item) => acc + item.value, 0);
    const total_pending_complaints = complaints_pending.reduce((acc, item) => acc + item.value, 0);

    return (
        <Stack direction="column" sx={{ gap: 2, width: "100%" }}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '16px', width: '100%' }}>
                <Stack direction="column" sx={{ gap: 2, width: '50%', alignItems: 'center' }}>
                    <Pie data={complaints_data} secondaryText="Complaints" total={total_complaints} />
                    <Stack direction="row" sx={{ gap: 2 }}>
                        <Pie data={complaints_resolved} secondaryText="Complaints Resolved" total={total_resolved_complaints} />
                        <Pie data={complaints_pending} secondaryText="Complaints Pending" total={total_pending_complaints} />
                    </Stack>
                </Stack>

                <div style={{ width: '40%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                    {complaints_data.map((complaint, index) => {
                        const color = colorsArray[index]; // Get a unique color for each category
                        return (
                            <Stack key={index} direction="row" sx={{ alignItems: 'center', gap: 4, pb: 2, width: '100%' }}>
                                <LinearProgressWithLabel
                                    label="Complaints"
                                    value={complaint.value}
                                    total={total_complaints}
                                    color={color}
                                    sx={{ width: '50%' }}
                                />
                                <Typography variant="h6" sx={{ marginLeft: 'auto', color: color, width: '50%' }}>
                                    {complaint.label}
                                </Typography>
                            </Stack>
                        );
                    })}
                </div>
            </div>
            <TotalComplaintsBarChart />
        </Stack>
    );
}
