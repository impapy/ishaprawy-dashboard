import MuiLink, { LinkProps as MuiLinkProps } from "@mui/material/Link"
import { reject, isNil } from "ramda"
import NextLink, { type LinkProps as NextLinkProps } from "next/link"
import { forwardRef } from "react"

export interface Props extends Omit<NextLinkProps, "as" | "onClick" | "onMouseEnter">, Omit<MuiLinkProps, "href"> {}

const separateProps = (props: Props) => {
  const { href, replace, scroll, shallow, passHref, prefetch, locale, ...rest } = props
  return {
    next: {
      href,
      replace,
      scroll,
      shallow,
      passHref,
      prefetch,
      locale,
    },
    mui: reject(isNil, rest),
  }
}

export const Link = forwardRef<HTMLAnchorElement, Props>(function Link(props, ref) {
  const { next, mui } = separateProps(props)

  return (
    <NextLink {...next} passHref>
      <MuiLink ref={ref} {...mui}>
        {props.children}
      </MuiLink>
    </NextLink>
  )
})

export default Link
