import {HTMLAttributes, ReactNode} from "react";
import * as s from './Typography.css'

type HeadingProps = {
    as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

type TextProps = {
    as?: "div" | "span"
}

const Heading = (p: HeadingProps & HTMLAttributes<HTMLHeadingElement>) => {
    const elems: Record<NonNullable<HeadingProps["as"]>, ReactNode> =  {
        'h1': <h1 {...p} className={s.heading + ' ' + p.className}>{p.children}</h1>,
        'h2': <h2 {...p} className={s.heading + ' ' + p.className}>{p.children}</h2>,
        'h3': <h3 {...p} className={s.heading + ' ' + p.className}>{p.children}</h3>,
        'h4': <h4 {...p} className={s.heading + ' ' + p.className}>{p.children}</h4>,
        'h5': <h5 {...p} className={s.heading + ' ' + p.className}>{p.children}</h5>,
        'h6': <h6 {...p} className={s.heading + ' ' + p.className}>{p.children}</h6>,
    }
    return elems[p.as || 'h2']
}

const Paragraph = (p: HTMLAttributes<HTMLParagraphElement>) => {
    return <p {...p} className={s.text + ' ' + p.className}>{p.children}</p>
}

const Text = (p: TextProps & HTMLAttributes<HTMLElement>) => {
    const elems: Record<NonNullable<TextProps["as"]>, ReactNode> =  {
        'div': <div {...p} className={s.text + ' ' + p.className}>{p.children}</div>,
        'span': <span {...p} className={s.text + ' ' + p.className}>{p.children}</span>,
    }
    return elems[p.as || 'div']
}

const Link = (p: HTMLAttributes<HTMLAnchorElement>) => {
    return <a {...p} className={s.text + ' ' + p.className}>{p.children}</a>
}

export const Typography = {Heading, Text, Paragraph, Link}