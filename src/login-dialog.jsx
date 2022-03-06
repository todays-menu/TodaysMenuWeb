import { Backdrop, Button, CircularProgress, Container, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from "@mui/material";
import { useState } from "react";

export default function LoginDialog(props) {
    const [userId, setUserId] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [inProgress, setInProgress] = useState(false);
    const onClose = () => {
        setUserId("");
        setUserPassword("");
        props.onCancel();
    }
    const onCancel = () => {
        setUserId("");
        setUserPassword("");
        props.onCancel();
    }
    const onConfirm = async (event) => {
        event.preventDefault();
        setInProgress(true);
        const user = userId;
        const preHashedPassword = (await argon2.hash({ pass: userPassword, salt: 'v202203061515' })).hashHex;
        props.onConfirm(user, preHashedPassword);
        setUserId("");
        setUserPassword("");
        setInProgress(false);
    }
    return (
        <Dialog fullWidth maxWidth='sm'
            open={props.open}
            onClose={onClose}>
            <DialogTitle>登入</DialogTitle>
            <form>
                <DialogContent>
                    <Backdrop open={inProgress}>
                        <CircularProgress color="inherit" />
                    </Backdrop>
                    <Container maxWidth="sm">
                        <Stack spacing={2}>
                            <TextField label="帳號" variant="standard"
                                autoFocus
                                value={userId}
                                onChange={e => setUserId(e.target.value)}
                            />
                            <TextField label="密碼" variant="standard" type="password"
                                value={userPassword}
                                onChange={e => setUserPassword(e.target.value)}
                            />
                        </Stack>
                    </Container>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onCancel} color="primary">
                        取消
                    </Button>
                    <Button onClick={onConfirm} type="submit" color="primary">
                        登入
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}