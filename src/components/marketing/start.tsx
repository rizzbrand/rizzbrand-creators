import React from 'react'
import Wrapper from "../global/wrapper";
import Container from "../global/container";
import Image from "next/image";
import Icons from "../global/icons";

const OurStory = () => {
    return (
        <div className="flex flex-col items-center justify-center w-full py-16 lg:py-24">
            <Wrapper>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="flex flex-col items-start justify-start md:items-center md:justify-center">
                        <Container>
                            <div className="flex items-center justify-center gap-x-1 px-2 py-1.5 relative w-max rounded-full before:absolute before:inset-0 before:-z-10 before:p-[1px] before:rounded-3xl before:bg-gradient-to-b before:from-neutral-700 before:to-neutral-900 before:content-[''] after:absolute after:inset-[1px] after:-z-10 after:rounded-[22px] after:bg-[#181818]/60">
                                <Icons.stars className="size-5" />
                                <span className="text-sm text-white">
                                your own physical product brand
                                </span>
                            </div>
                        </Container>
                        <Container delay={0.1} className="flex grow">
                            <h2 className="text-3xl md:text-4xl font-semibold text-left mt-4">
                              Create / Scale your Own Brand
                            </h2>
                        </Container>
                        <Container delay={0.3} className="mt-auto">
                            <div className="flex items-center gap-4">
                                <div className="size-24">
                                    <Image
                                        src="/icons/heart.svg"
                                        alt="Heart"
                                        width={1024}
                                        height={1024}
                                        className="w-full h-full"
                                    />
                                </div>
                                <p className="text-base md:text-lg text-muted-foreground text-left mt-2 max-w-2xl">
                                We provide you the full team and infrastructure to launch and grow your own product brand.
                                </p>
                            </div>
                        </Container>
                    </div>

                    <div className="flex flex-col gap-8">
                        <Container className="flex items-start gap-6">
                            <div className="flex flex-col items-center min-w-[40px]">
                                <span className="text-2xl font-semibold text-muted-foreground/80 font-heading">
                                    01
                                </span>
                                <span className="w-px h-16 bg-neutral-700 mt-1"></span>
                            </div>
                            <div className="flex-1">
                                <h4 className="text-xl lg:text-2xl font-semibold font-heading">
                                  Product Design & Development
                                </h4>
                                <div className="mt-2 text-base text-neutral-400">
                                Our in-house designs and product developers work with you to create the highest quality products
                                </div>
                            </div>
                        </Container>
                        <Container delay={0.1} className="flex items-start gap-6">
                            <div className="flex flex-col items-center min-w-[40px]">
                                <span className="text-2xl font-semibold text-muted-foreground/80 font-heading">
                                    02
                                </span>
                                <span className="w-px h-16 bg-neutral-700 mt-1"></span>
                            </div>
                            <div className="flex-1">
                                <h4 className="text-xl lg:text-2xl font-semibold font-heading">
                                    Trusted Suppliers
                                </h4>
                                <div className="mt-2 text-base text-neutral-400">
                                Our network of 50+ factories are vetted with a proven track record.
                                </div>
                            </div>
                        </Container>
                        <Container delay={0.2} className="flex items-start gap-6">
                            <div className="flex flex-col items-center min-w-[40px]">
                                <span className="text-2xl font-semibold text-muted-foreground/80 font-heading">
                                    03
                                </span>
                                <span className="w-px h-16 bg-neutral-700 mt-1"></span>
                            </div>
                            <div className="flex-1">
                                <h4 className="text-xl lg:text-2xl font-semibold font-heading">
                                  E-commerce
                                </h4>
                                <div className="mt-2 text-base text-neutral-400">
                                We build and scale your e-commerce store so your audience can have the best buying experience
                                </div>
                            </div>
                        </Container>
                    </div>
                </div>
            </Wrapper>
        </div>
    )
};

export default OurStory
