import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { BarChart } from "@mui/x-charts/BarChart";
import { useTheme } from "@mui/material/styles";
import { getComplaints } from "../../firebaseUtils/getRequests";

export default function TotalComplaintsBarChart() {
  const theme = useTheme();
  const [category, setCategory] = React.useState(null);
  const [solved, setSolved] = React.useState(null);
  const [pending, setPending] = React.useState(null);
  const colorPalette = [
    (theme.vars || theme).palette.primary.dark,
    (theme.vars || theme).palette.primary.main,
    (theme.vars || theme).palette.primary.light,
  ];
  React.useEffect(() => {
    getSolvedCount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getSolvedCount = async () => {
    const res = await getComplaints();
    const segregatedComplaints = getCategoryStatusCount(res);
    const categories = Object.keys(segregatedComplaints);
    console.log("segregatedComplaints", segregatedComplaints);
    const solvedCounts = categories.map(
      (category) => segregatedComplaints[category].solvedComplaints
    );
    const pendingCounts = categories.map(
      (category) => segregatedComplaints[category].pendingComplaints
    );
    setCategory(categories);
    setSolved(solvedCounts);
    setPending(pendingCounts);
  };

  const getCategoryStatusCount = (complaints) => {
    const categoryCount = {};
    complaints &&
      complaints.forEach((complaint) => {
        const { category, status } = complaint;
        if (!categoryCount[category]) {
          categoryCount[category] = {
            solvedComplaints: 0,
            pendingComplaints: 0,
          };
        }

        if (status === "done") {
          categoryCount[category].solvedComplaints++;
        } else if (status === "progress") {
          categoryCount[category].pendingComplaints++;
        }
      });

    return categoryCount;
  };

  return (
    <Card variant="outlined" sx={{ width: "100%" }}>
      <CardContent>
        <Typography component="h2" variant="subtitle2" gutterBottom>
          Category Wise Complaints
        </Typography>

        <BarChart
          borderRadius={8}
          colors={colorPalette}
          xAxis={[
            {
              scaleType: "band",
              categoryGapRatio: 0.5,
              data: category && category.length ? category : [],
            },
          ]}
          series={[
            {
              id: "solved_complaints",
              label: "Solved Complaints",
              data: solved && solved.length ? solved : [],
              stack: "A",
            },
            {
              id: "pending_complaints",
              label: "Pending Complaints",
              data: pending && pending.length ? pending : [],
              stack: "A",
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
