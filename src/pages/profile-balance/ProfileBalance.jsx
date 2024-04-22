import React from "react";
import { Box, Typography, Container, Divider, Button } from "@mui/material";
import { useParams, Link } from "react-router-dom";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import ProfileSwitch from "../../components/profile-switch/ProfileSwitch";
import CircularProgressBar from "../../components/component-progress-bar/CircularProgressBar";

function ProfileBalance() {
  const { id } = useParams();

  // Dummy data for the selected profile and transactions
  const profile = { name: "Alice", balance: 50, lifetimeEarnings: 100 }; // Added lifetimeEarnings for demonstration
  const transactions = [
    { id: 1, name: "Mow the Lawn", amount: 5, type: "deposit" },
    { id: 2, name: "Weekly Allowance", amount: 10, type: "deposit" },
    { id: 3, name: "Candy Store", amount: -3, type: "withdrawal" },
    // ... more transactions
  ];

  return (
    <div>
      <Container component="main" maxWidth="sm">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <CircularProgressBar
            size={150}
            thickness={4}
            value={profile.balance}
            maxValue={profile.lifetimeEarnings}
            name={profile.name}
          />
          <ProfileSwitch />
          <Typography component="h2" variant="h5" sx={{ marginY: 2 }}>
            Transactions
          </Typography>
          <Box sx={{ overflowY: "auto", maxHeight: "200px", width: "100%" }}>
            {transactions.map((transaction, index) => (
              <Box key={transaction.id}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between", // This spreads out the children to both ends
                    paddingY: 1, // Adds padding to the top and bottom
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <FiberManualRecordIcon
                      sx={{
                        color: transaction.type === "deposit" ? "green" : "red",
                        marginRight: 2,
                      }}
                    />
                    <Typography variant="body1" sx={{ flexGrow: 1 }}>
                      {transaction.name}
                    </Typography>{" "}
                    {/* flexGrow ensures it takes up available space */}
                  </Box>
                  <Typography variant="body1">${transaction.amount}</Typography>
                </Box>
                {/* Add a Divider after each transaction except the last one */}
                {index !== transactions.length - 1 && (
                  <Divider sx={{ width: "70%", alignSelf: "center" }} />
                )}
              </Box>
            ))}
          </Box>
          <Button
            component={Link}
            to="/redeem-request"
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Withdraw
          </Button>
        </Box>
      </Container>
    </div>
  );
}

export default ProfileBalance;
