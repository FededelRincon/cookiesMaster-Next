import { ChangeEvent, FC, useEffect, useState } from "react";
import { Button, Card, CardContent, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";
import { Layout } from "../components/layouts"
import Cookies from 'js-cookie';
import { GetServerSideProps } from 'next'
import axios from 'axios';


interface Props {
    theme: string;
}


const ThemeChangerPage:FC<Props> = ({ theme }) => {

    // console.log(props);

    const [currentTheme, setCurrentTheme] = useState( theme );

    const onThemeChange = ( event: ChangeEvent<HTMLInputElement> ) => {
        const selectedTheme = event.target.value;

        setCurrentTheme( selectedTheme );

        localStorage.setItem('theme', selectedTheme);
        Cookies.set('theme', selectedTheme ); //solo tiene 4k de informacion
    }


    const onClick = async () => {
        const { data } = await axios.get('/api/hello');

        console.log( 'desde /api/hello', data )
    }

    useEffect(() => {
        console.log('LocalStorage: ', localStorage.getItem('theme'))

        console.log('Cookies', Cookies.get('theme'))



    }, [])
    

    return (
        <Layout>
            <Card>
                <CardContent>
                    <FormControl>
                        <FormLabel>Tema</FormLabel>
                        <RadioGroup
                            value={ currentTheme }
                            onChange={ onThemeChange }
                        >
                            <FormControlLabel value='light' control={ <Radio /> } label='Light' />
                            <FormControlLabel value='dark' control={ <Radio /> } label='Dark' />
                            <FormControlLabel value='custom' control={ <Radio /> } label='Custom' />
                        </RadioGroup>
                    </FormControl>

                    <Button
                        onClick={ onClick }
                    >
                        Solicitud
                    </Button>
                </CardContent>
            </Card>
        </Layout>
    )
}




// snippets nextSSRProps
// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async (ctx) => {

    // console.log( ctx.req );
    const { theme = 'light', name ='No name' } = ctx.req.cookies;

    const validThemes = ['light', 'dark', 'custom'];





    return {
        props: {
            theme: validThemes.includes(theme) ? theme : 'dark',
            name
        }
    }
}


export default ThemeChangerPage;