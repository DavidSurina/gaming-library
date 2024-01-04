import React from "react";
import {useParams, useNavigate} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {RawgApiService, rawgSubUrls} from "../../globals/functions/rawgApi";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import {Button, Carousel, Image, Tab, Tabs} from "react-bootstrap";
import {Game, GameScreenshotResults} from "../../globals/types/rawgTypes";
import {Game, GameScreenshotResultsType} from "../../globals/types/rawgTypes";
import './style.scss';

function GameDetail() {
    const {id} = useParams();
    const navigate = useNavigate();
    const {getRawgData} = RawgApiService;
    const gameParam = `${rawgSubUrls.game}/${id}`;
    const screenShotParam = `${rawgSubUrls.game}/${id}/screenshots`;

    const {data, isInitialLoading} = useQuery<Game>({
        queryKey: [`game-${id}`],
        queryFn: () => getRawgData<Game>(gameParam, {}),
    });

    const {data: screenshotsData, isInitialLoading: screenshotsInitialLoading} = useQuery({
        queryKey: [``],
        queryFn: () => getRawgData<GameScreenshotResults>(screenShotParam, {}),
    })

    if (isInitialLoading || screenshotsInitialLoading) {
        return <LoadingSpinner/>;
    }


    return (
        <section className="game-detail_wrapper"
                 style={{
                     backgroundImage: `url(${data?.background_image})`,
                     backgroundPosition: 'center',
                     backgroundSize: 'cover'
                 }}>

            <div className="game-detail_top-section">
                <Button type="button" variant='link' className="game-detail_back-btn" onClick={() => navigate(-1)}>
                    Back
                </Button>
                <h1 className="game-detail_main-heading">{data?.name}</h1>
                <div className="game-detail_top-content">
                    {screenshotsData &&
                        <Carousel className="game-detail_carousel">
                            {screenshotsData.results.map((item) => {
                                return <Carousel.Item key={`${item.id}Slide`}>
                                    <div className="game-detail_carousel-img-container">
                                        <Image className="game-detail_carousel-img" src={item.image}/>
                                    </div>
                                </Carousel.Item>
                            })}
                        </Carousel>
                    }
                    <ul className="game-detail_top-description">
                        <li className="game-detail_description-row">
                            <span>Publisher:</span>
                            <span></span>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="game-detail_bottom-section">
                <Tabs defaultActiveKey="details">
                    <Tab eventKey="details" title='Details'>
                        <section>
                            <div>Hi tab 1</div>

                        </section>
                    </Tab>
                    <Tab eventKey='reviews' title='Reviews'>
                        <section>
                            Hi tab 2
                        </section>
                    </Tab>
                    <Tab eventKey='more' title='More'>
                        <section>
                            Hi tab 3
                        </section>
                    </Tab>
                </Tabs>
            </div>
        </section>
    );
}

export default GameDetail;
