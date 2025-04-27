import { addToast } from "@heroui/react"; // or @heroui/react

export const showErrorToast = (message: string) => {
    addToast({
        title: "Error",
        description: message,
        color: "danger",
        variant: "flat",
        timeout: 5000
    });
}