import React from 'react';
import Button from '@material-ui/core/Button';

interface Props {

}

const MainPage: React.FC<Props> = () => {
    return (
        <>
            <Button variant="contained" color="primary">
                Hello World
            </Button>
        </>
    )
}

export default MainPage;