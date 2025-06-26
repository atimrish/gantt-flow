import {forwardRef, HTMLAttributes, ReactNode, Ref} from "react";
import * as s from './Typography.css'

type HeadingProps = {
    as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

type TextProps = {
    as?: "div" | "span"
}

const Heading = (p: HeadingProps & HTMLAttributes<HTMLHeadingElement>) => {
    let classNames = s.heading
    if (p.className) {
        classNames += ' ' + p.className
    }

    const elems: Record<NonNullable<HeadingProps["as"]>, ReactNode> =  {
        'h1': <h1 {...p} className={classNames}>{p.children}</h1>,
        'h2': <h2 {...p} className={classNames}>{p.children}</h2>,
        'h3': <h3 {...p} className={classNames}>{p.children}</h3>,
        'h4': <h4 {...p} className={classNames}>{p.children}</h4>,
        'h5': <h5 {...p} className={classNames}>{p.children}</h5>,
        'h6': <h6 {...p} className={classNames}>{p.children}</h6>,
    }
    return elems[p.as || 'h2']
}

const Paragraph = (p: HTMLAttributes<HTMLParagraphElement>) => {
    let classNames = s.text
    if (p.className) {
        classNames += ' ' + p.className
    }

    return <p {...p} className={classNames}>{p.children}</p>
}

const Text = forwardRef((p: TextProps & HTMLAttributes<HTMLElement>, ref: Ref<HTMLDivElement>) => {
    let classNames = s.text
    if (p.className) {
        classNames += ' ' + p.className
    }

    const elems: Record<NonNullable<TextProps["as"]>, ReactNode> =  {
        'div': <div {...p} ref={ref} className={classNames}>{p.children}</div>,
        'span': <span {...p} ref={ref} className={classNames}>{p.children}</span>,
    }
    return elems[p.as || 'div']
})

const Link = (p: HTMLAttributes<HTMLAnchorElement>) => {
    let classNames = s.text
    if (p.className) {
        classNames += ' ' + p.className
    }

    return <a {...p} className={classNames}>{p.children}</a>
}

export const Typography = {Heading, Text, Paragraph, Link}