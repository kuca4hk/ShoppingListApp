import Stack from 'react-bootstrap/Stack';
import ShopingListComponenta from "./shopingListComponenta.jsx";

function StackComponent() {
    return (
        <Stack gap={3}>
            <ShopingListComponenta />
            <ShopingListComponenta />
            <ShopingListComponenta />
        </Stack>
    );
}

export default StackComponent;