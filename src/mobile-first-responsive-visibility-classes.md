---
title: Mobile-first Responsive Visibility Classes
post_type: notes
publish_date: March 30, 2016
---

### What are visibility classes?

Visibility classes are CSS selectors applied to HTML to help hide or show HTML elements.

A simple set of visiblity classes:

```
.hide { display: none }
.show { display: block }
```

### Responsive Visibility Classes

Responsive visibility classes hide or show HTML elements based on the width of the web page. 

An advanced set of visibility classes (written in SASS):

```
// --------------------------------------------------
// Visibility Helper Classes
// --------------------------------------------------

$xs: 480px !default;
$sm: 768px !default;
$md: 992px !default;
$lg: 1200px !default;

.hide {
	display:none;
}

.show {
	display:block;
}

.#{'hide-'} {
	// Hide >= XS breakpoint
	&xs {
		@media screen and (min-width: $xs) {
			display:none!important;
		}
	}
	// Hide >= SM breakpoint
	&sm {
		@media screen and (min-width: $sm) {
			display:none!important;
		}
	}
	// Hide >= MD breakpoint
	&md {
		@media screen and (min-width: $md) {
			display:none!important;
		}
	}
	// Hide >= LG breakpoint
	&lg {
		@media screen and (min-width: $lg) {
			display:none!important;
		}
	}
}

.#{'show-'} {
	// Show >= XS breakpoint
	&xs {
		@media screen and (min-width: $xs) {
			display:block!important;
		}
	}
	// Show >= SM breakpoint
	&sm {
		@media screen and (min-width: $sm) {
			display:block!important;
		}
	}
	// Show >= MD breakpoint
	&md {
		@media screen and (min-width: $md) {
			display:block!important;
		}
	}
	// Show >= LG breakpoint
	&lg {
		@media screen and (min-width: $lg) {
			display:block!important;
		}
	}
}
```

### Usage

|                                           | < XS width | >= XS width | >= SM width | >= MD width | >= LG width |
|-------------------------------------------|------------|-------------|-------------|-------------|-------------|
| **.hide**                                     | Hidden     | Hidden      | Hidden      | Hidden      | Hidden      |
|**.show**                                     | Visible    | Visible     | Visible     | Visible     | Visible     |
| **.hide-xs**                                  | Visible    | Hidden      | Hidden      | Hidden      | Hidden      |
| **.hide-sm**                                  | Visible    | Visible     | Hidden      | Hidden      | Hidden      |
| **.hide-md**                                  | Visible    | Visible     | Visible     | Hidden      | Hidden      |
| **.hide-lg**                                  | Visible    | Visible     | Visible     | Visible     | Hidden      |
| **.hide .show-xs**                            | Hidden     | Visible     | Visible     | Visible     | Visible     |
| **.hide .show-sm**                            | Hidden     | Hidden      | Visible     | Visible     | Visible     |
| **.hide .show-md**                            | Hidden     | Hidden      | Hidden      | Visible     | Visible     |
| **.hide .show-lg**                            | Hidden     | Hidden      | Hidden      | Hidden      | Visible     |
| **.hide .show-xs .hide-sm .show-md .hide-lg** | Hidden     | Visible     | Hidden      | Visible     | Hidden      |
| **.hide .show-sm .hide-md .show-lg**          | Hidden     | Hidden      | Visible     | Hidden      | Visible     |
| **.hide .show-md .hide-lg**                   | Hidden     | Hidden      | Hidden      | Visible     | Hidden      |
| **.hide .show-md .hide-lg**                   | Hidden     | Hidden      | Hidden      | Visible     | Hidden      |
|  **.hide .show-sm .hide-md**                   | Hidden     | Hidden      | Visible     | Hidden      | Hidden      |
| **.hide .show-xs .hide-sm**                   | Hidden     | Visible     | Hidden      | Hidden      | Hidden      |

### Mobile-first logic

The logic behind this approah is simple. Start developing for the mobile width first, and work your way up the width of the viewport. 