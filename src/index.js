import "./styles/index.css";

import { userProfileContainer } from "./scripts/components/user-profile";
import { placesContainer } from "./scripts/components/places";

const bootstrap = async () => {
    await userProfileContainer.init();

    placesContainer.setUserService(userProfileContainer);
    await placesContainer.init();
};

bootstrap();
