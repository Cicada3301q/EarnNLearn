import React, { useState } from "react";
import { Box, Typography, Divider, Button } from "@mui/material";
import { useParams } from "react-router-dom";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import ProfileSwitch from "../../components/ProfileSwitch";
import CircularProgressBar from "../../components/CircularProgressBar";
import PageWrapper from "../../components/PageWrapper";
import { useQuery } from "../../hooks/useQuery";
import WithdrawCreationModal from "../../components/WithdrawCreationModal";

function ProfileBalance() {
  const { id } = useParams();
  const childUserResponse = useQuery(`child-${id}`, `user/child/${id}`);
  const { data: childUser, isLoading: isChildUserLoading } = childUserResponse;

  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const profile = { name: "Alice", balance: 50, lifetimeEarnings: 100 };
  const transactions = [
    { id: 1, name: "Mow the Lawn", amount: 5, type: "deposit" },
    { id: 2, name: "Weekly Allowance", amount: 10, type: "deposit" },
    { id: 3, name: "Candy Store", amount: -3, type: "withdrawal" },
  ];

  return (
    <PageWrapper>
      <CircularProgressBar
        size={150}
        thickness={4}
        value={profile.balance}
        maxValue={profile.lifetimeEarnings}
        name={isChildUserLoading ? "loading.." : childUser.firstName}
      />
      <ProfileSwitch />
      <Typography component="h2" variant="h5" sx={{ marginY: 2 }}>
        Transactions
      </Typography>
      <Box sx={{ overflowY: "auto", maxHeight: "200px", width: "80%" }}>
        {transactions.map((transaction, index) => (
          <Box key={transaction.id}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                paddingY: 1,
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
                </Typography>
              </Box>
              <Typography variant="body1">${transaction.amount}</Typography>
            </Box>
            {index !== transactions.length - 1 && (
              <Divider sx={{ width: "70%", alignSelf: "center" }} />
            )}
          </Box>
        ))}
      </Box>
      <Button
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        onClick={handleOpenModal}
      >
        Withdraw
      </Button>
      <WithdrawCreationModal
        open={isModalOpen}
        handleClose={handleCloseModal}
      />
    </PageWrapper>
  );
}

export default ProfileBalance;
