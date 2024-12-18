import React, { useState, useContext } from "react";
import { Box, Typography, Divider, Button } from "@mui/material";
import { useParams } from "react-router-dom";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import ProfileSwitch from "../../components/ProfileSwitch";
import CircularProgressBar from "../../components/CircularProgressBar";
import PageWrapper from "../../components/PageWrapper";
import { useQuery } from "../../hooks/useQuery";
import WithdrawCreationModal from "../../components/WithdrawCreationModal";
import { QueryContext } from "../../context/QueryContextProvider";
import { useAuth } from "../../hooks/useAuth";
import { HTTP_METHOD, ROLE, TRANSACTION_STATUS } from "../../constants/enums";
import { useMutation } from "../../hooks/useMutation";
import { toast } from "react-toastify";

function ProfileBalance() {
  const { invalidateQueryKey } = useContext(QueryContext);
  const { id } = useParams();
  const { user } = useAuth();
  const isParent = user?.role === ROLE.PARENT;

  const queryKey = `transaction-${id}`;

  const childUserResponse = useQuery(`child-${id}`, `user/child/${id}`);

  const { data: childUser, isLoading: isChildUserLoading } = childUserResponse;

  const transactionDataResponse = useQuery(
    queryKey,
    `transactions/transaction/${id}`
  );

  const {
    data: transactionData,
    isLoading: transactionLoading,
    isError: transactionError,
  } = transactionDataResponse;

  const transactionList =
    !transactionLoading && !transactionError && transactionData.transactionList;

  const [openCreationModal, setOpenCreationModal] = useState(false);

  const { mutate: createWithdrawal } = useMutation();
  const { mutate: updateTransaction } = useMutation();
  const { mutate: deleteTransaction } = useMutation();

  const handleCreateWithdrawl = (transaction) => {
    createWithdrawal({
      route: "transactions/transaction",
      method: HTTP_METHOD.POST,
      body: transaction,
      options: {
        onSuccess: () => {
          invalidateQueryKey(queryKey);
          toast.success("Transaction created successfully!");
          handleCloseModal();
        },
        onError: () => {
          toast.error("Failed to create Transaction");
        },
      },
    });
  };

  const handleApprove = (transactionId) => {
    updateTransaction({
      route: `transactions/update/${transactionId}`,
      method: HTTP_METHOD.PUT,
      body: {
        status: TRANSACTION_STATUS.WITHDRAWAL,
      },
      options: {
        onSuccess: () => {
          invalidateQueryKey(queryKey);
          toast.success("Transaction approved!");
        },
        onError: () => {
          toast.error("Failed to approve transaction");
        },
      },
    });
  };

  const handleDeny = (transactionId) => {
    updateTransaction({
      route: `transactions/update/${transactionId}`,
      method: HTTP_METHOD.PUT,
      body: {
        status: TRANSACTION_STATUS.DENIED,
      },
      options: {
        onSuccess: () => {
          invalidateQueryKey(queryKey);
          toast.success("Transaction denied successfully!");
        },
        onError: () => {
          toast.error("Failed to deny transaction");
        },
      },
    });
  };

  const handleCloseModal = () => {
    setOpenCreationModal(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case TRANSACTION_STATUS.DEPOSIT:
        return "green";
      case TRANSACTION_STATUS.PENDING:
        return "lightblue";
      case TRANSACTION_STATUS.WITHDRAWAL:
        return "lightred";
      case TRANSACTION_STATUS.DENIED:
        return "red";
      default:
        return "gray";
    }
  };

  if (transactionLoading) {
    return <div>...load</div>;
  }

  return (
    <PageWrapper>
      <CircularProgressBar
        size={150}
        thickness={4}
        value={transactionData?.totalSaved || 0}
        maxValue={transactionData?.totalEarnings || 1}
        name={isChildUserLoading ? "loading.." : childUser.firstName}
      />
      <ProfileSwitch />
      <Typography component="h2" variant="h5" sx={{ marginY: 2 }}>
        Transactions
      </Typography>
      <Box sx={{ overflowY: "auto", maxHeight: "200px", width: "80%" }}>
        {transactionList.map((transaction, index) => (
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
                    color: getStatusColor(transaction.status),
                    marginRight: 2,
                  }}
                />
                <Typography variant="body1" sx={{ flexGrow: 1 }}>
                  {transaction.description}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                {isParent &&
                  transaction.status === TRANSACTION_STATUS.PENDING && (
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleApprove(transaction.id)}
                      >
                        Approve
                      </Button>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => handleDeny(transaction.id)}
                      >
                        Deny
                      </Button>
                    </Box>
                  )}
                <Typography variant="body1">${transaction.amount}</Typography>
              </Box>
            </Box>
            {index !== transactionList.length - 1 && (
              <Divider sx={{ width: "70%", alignSelf: "center" }} />
            )}
          </Box>
        ))}
      </Box>
      {!isParent && (
        <Button variant="contained" onClick={() => setOpenCreationModal(true)}>
          withdrawal
        </Button>
      )}
      {openCreationModal && (
        <WithdrawCreationModal
          open={openCreationModal}
          handleClose={handleCloseModal}
          handleCreate={handleCreateWithdrawl}
          childId={id}
        />
      )}
    </PageWrapper>
  );
}

export default ProfileBalance;
