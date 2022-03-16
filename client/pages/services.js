import { motion, AnimatePresence } from 'framer-motion';
import React from 'react';
import Service from '../components/Service';
import { useCtx } from '../components/Context'


export default function Services() {
    const { exportUser, exportIsLogged, exportServices, services, user, isLogged } = useCtx();
    const [loading, setLoading] = React.useState(false);

    const manageServiceConnection = async (name, url) => {
        // OAUTH2 HERE
        if (name == "Meteo" || name == "Crypto" || name == "Youtube") {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', "x-access-token": user.accessToken },
                body: JSON.stringify({ serviceName: name }),
            };
            setLoading(true)
            fetch('http://localhost:8080/api/service/connect', requestOptions)
                .then(response => response.json())
                .then(data => {
                    exportServices(data.services)
                    setLoading(false)
                }
                );
        } else {
            const requestOptions = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', "x-access-token": user.accessToken },
            };
            setLoading(true)
            fetch(`http://localhost:8080/api/service/geturl?url=${url}`, requestOptions)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
     /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    let windowObjectReference = null;
                    let previousUrl = null;
                    window.removeEventListener('message', receiveMessage);
                    const strWindowFeatures = 'toolbar=no, menubar=no, width=600, height=700, top=100, left=100';
                    if (windowObjectReference === null || windowObjectReference.closed) {
                        windowObjectReference = window.open(data.url, "Google Oauth2", strWindowFeatures);
                    } else if (previousUrl !== data.url) {
                        windowObjectReference = window.open(data.url, "Google Oauth2", strWindowFeatures);
                        windowObjectReference.focus();
                    } else
                        windowObjectReference.focus();
                    window.addEventListener('message', event => receiveMessage(event), false);
                    previousUrl = url;
                    const receiveMessage = async event => {
                        // Do we trust the sender of this message? (might be
                        // different from what we originally opened, for example).
                        console.log(event)
                        console.log(decodeURIComponent(event.data.split("=")[1].split('&')[0]))
                        const requestOptionsConnect = {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json', "x-access-token": user.accessToken },
                            body: JSON.stringify({ serviceName: name, token: decodeURIComponent(event.data.split("=")[1].split('&')[0]) }),
                        };
                        fetch(`http://localhost:8080/api/service/connect`, requestOptionsConnect)
                        .then(response => response.json())
                        .then(data => {
                            exportServices(data.services)
                            setLoading(false)
                        });
                       };
     //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    //window.open(data.url, "_blank");
                    //exportServices(data.services)
                    setLoading(false)
                });
        }
    }

    return (
        <>
            {isLogged && (
                <div className="w-screen h-screen bg-[#ededed] pl-[22%] pt-[7%] select-none">
                    <motion.div className='w-[80%] overflow-hidden'
                        initial={{ height: "0%" }}
                        animate={{ height: "auto", transition: { duration: 0.3 } }}
                        exit={{ height: "0%" }}
                    >
                        <div className='bg-gradient-to-r from-[#F14B1C] to-[#D11D20] h-14 rounded-t-xl flex '>
                            <p className='text-white text-2xl self-center mx-4'>List of Services</p>
                        </div>
                        <div className='bg-white rounded-b-xl flex flex-col p-5'>
                            <p className='text-md mb-2'>You need to connect to our supported services to be able to use them in your AREAs.</p>
                            {loading ? (<></>) : (
                                <>
                                    <Service name="Meteo" label="Meteo" setter={manageServiceConnection} value={services["Meteo"].isConnected} url="" />
                                    <Service name="Gmail" label="Gmail" setter={manageServiceConnection} value={services["Gmail"].isConnected} url="https://mail.google.com/" />
                                    <Service name="Google_Docs" label="Google Docs" setter={manageServiceConnection} value={services["Google_Docs"].isConnected} url="https://www.googleapis.com/auth/documents" />
                                    <Service name="Crypto" label="Crypto" setter={manageServiceConnection} value={services["Crypto"].isConnected} url="" />
                                    <Service name="Google_Calendar" label="Google Calendar" setter={manageServiceConnection} value={services["Google_Calendar"].isConnected} url="https://www.googleapis.com/auth/calendar" />
                                    <Service name="Youtube" label="Youtube" setter={manageServiceConnection} value={services["Youtube"].isConnected} url="" />
                                </>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </>
    );
}