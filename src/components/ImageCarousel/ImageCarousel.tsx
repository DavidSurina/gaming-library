import React, {MutableRefObject, useCallback, useRef, useState} from "react";
import {GameScreenshotResultsType} from "../../globals/types/rawgTypes";
import {Button, Carousel, Image, Modal} from "react-bootstrap";
import {
    ChevronLeft as ChevronLeftIcon,
    ChevronRight as ChevronRightIcon,
} from "react-bootstrap-icons";
import './style.scss';

type PropTypes = {
    images: GameScreenshotResultsType;
}

function ImageCarousel(props: PropTypes) {
    const {images} = props;
    const [galleryOpen, setGalleryOpen] = useState(false);
    const [imageIndex, setImageIndex] = useState<number>(0);

    const scrollWrapperRef: MutableRefObject<HTMLDivElement | null> = useRef(null);
    const galleryScrollRef: MutableRefObject<HTMLDivElement | null> = useRef(null);

    const openGalleryHandle = useCallback((index: number) => {
        setGalleryOpen(true);
        setImageIndex(index);
    }, []);

    const scroll = (offset: number) => {
        if (scrollWrapperRef.current) {
            scrollWrapperRef.current.scrollLeft += offset;
        }
        if (galleryScrollRef.current) {
            galleryScrollRef.current.scrollLeft += offset;
        }
    }

    const handleImageIndex = (selectedIndex: number) => {
        setImageIndex(selectedIndex);
    };

    const resetGallery = useCallback(() => {
        setGalleryOpen(false);
        setImageIndex(0);
    }, []);

    return <>
        <div className="carousel">
            <Button onClick={() => scroll(-500)} className="carousel_btn-left"><ChevronLeftIcon/></Button>
            <div className="carousel_wrapper" ref={scrollWrapperRef}>
                {
                    images.results.map((result, index) => (
                        <div key={result.id} className="carousel_img-wrapper"
                             onClick={() => openGalleryHandle(index)}>
                            <Image src={result.image} className="carousel_img"/>
                        </div>
                    ))
                }
            </div>
            <Button onClick={() => scroll(500)} className="carousel_btn-right"><ChevronRightIcon/></Button>
        </div>
        <Modal show={galleryOpen} onHide={resetGallery} fullscreen>
            <Modal.Header closeButton closeVariant="white"/>
            <Modal.Body>
                <Carousel fade activeIndex={imageIndex} onSelect={handleImageIndex} controls={false}
                          className="modal_gallery-wrapper">
                    {
                        images.results.map((item) => {
                            return <Carousel.Item key={`carouselItem${item.id}`}>
                                <div className="modal_gallery-img">
                                    <Image className="modal_gallery-img" src={item.image}/>
                                </div>
                            </Carousel.Item>
                        })
                    }
                </Carousel>
                <div className="carousel">
                    <Button onClick={() => scroll(-500)} className="carousel_btn-left"><ChevronLeftIcon/></Button>
                    <div className="carousel_wrapper" ref={galleryScrollRef}>
                        {
                            images.results.map((result, index) => (
                                <div key={result.id} className="carousel_img-wrapper"
                                     onClick={() => openGalleryHandle(index)}>
                                    <Image src={result.image} className="carousel_img"/>
                                </div>
                            ))
                        }
                    </div>
                    <Button onClick={() => scroll(500)} className="carousel_btn-right"><ChevronRightIcon/></Button>
                </div>
            </Modal.Body>
        </Modal>
    </>
}

export default ImageCarousel;