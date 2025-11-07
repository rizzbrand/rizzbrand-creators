import { PhoneIcon, MailIcon, MapPinIcon } from "lucide-react";

export const CONTACT_CARDS = [
    {
        title: "Phone Number",
        value: "+233 532 8187 25",
        icon: PhoneIcon
    },
    {
        title: "Trackify Address",
        value: "Nigeria, Ghana",
        icon: MapPinIcon
    },
    {
        title: "Email Address",
        value: "hey@mytrackify.com",
        icon: MailIcon
    }
] as const;
