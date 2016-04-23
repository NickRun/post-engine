---
title: Mobile-first Responsive Visibility Classes
post_type: notes
publish_date: March 30, 2016
---

<h3 class="no-top-margin">What are visibility classes?</h3>

Visibility classes are applied to HTML to <span class="highlight">help hide or show HTML elements.</span>

A simple set of visiblity classes:

	.hide { display: none }
	.show { display: block }

### Responsive Visibility Classes

Responsive visibility classes hide or show HTML elements based on the width of the web page. 

An advanced set of visibility classes (written in SASS):

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

### Usage

<div class="responsive-table">
	<table>
		<thead>
			<tr>
				<th></th>
				<th>< XS width</th>
				<th>>= XS width</th>
				<th>>= SM width</th>
				<th>>= MD width</th>
				<th>>= LG width</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td class="bold">.hide</td>
				<td>Hidden</td>
				<td>Hidden</td>
				<td>Hidden</td>
				<td>Hidden</td>
				<td>Hidden</td>
			</tr>
			<tr>
				<td class="bold">.show</td>
				<td><span class="highlight">Visible</span></td>
				<td><span class="highlight">Visible</span></td>
				<td><span class="highlight">Visible</span></td>
				<td><span class="highlight">Visible</span></td>
				<td><span class="highlight">Visible</span></td>
			</tr>
			<tr>
				<td class="bold">.hide-xs</td>
				<td><span class="highlight">Visible</span></td>
				<td>Hidden</td>
				<td><span class="highlight">Visible</span></td>
				<td><span class="highlight">Visible</span></td>
				<td><span class="highlight">Visible</span></td>
			</tr>
			<tr>
				<td class="bold">.hide-sm</td>
				<td><span class="highlight">Visible</span></td>
				<td><span class="highlight">Visible</span></td>
				<td>Hidden</td>
				<td><span class="highlight">Visible</span></td>
				<td><span class="highlight">Visible</span></td>
			</tr>
			<tr>
				<td class="bold">.hide-md</td>
				<td><span class="highlight">Visible</span></td>
				<td><span class="highlight">Visible</span></td>
				<td><span class="highlight">Visible</span></td>
				<td>Hidden</td>
				<td>Hidden</td>
			</tr>
			<tr>
				<td class="bold">.hide-lg</td>
				<td><span class="highlight">Visible</span></td>
				<td><span class="highlight">Visible</span></td>
				<td><span class="highlight">Visible</span></td>
				<td><span class="highlight">Visible</span></td>
				<td>Hidden</td>
			</tr>
			<tr>
				<td class="bold">.hide .show-xs</td>
				<td>Hidden</td>
				<td><span class="highlight">Visible</span></td>
				<td><span class="highlight">Visible</span></td>
				<td><span class="highlight">Visible</span></td>
				<td><span class="highlight">Visible</span></td>
			</tr>
			<tr>
				<td class="bold">.hide .show-sm</td>
				<td>Hidden</td>
				<td>Hidden</td>
				<td><span class="highlight">Visible</span></td>
				<td><span class="highlight">Visible</span></td>
				<td><span class="highlight">Visible</span></td>
			</tr>
			<tr>
				<td class="bold">.hide .show-md</td>
				<td>Hidden</td>
				<td>Hidden</td>
				<td>Hidden</td>
				<td><span class="highlight">Visible</span></td>
				<td><span class="highlight">Visible</span></td>
			</tr>
			<tr>
				<td class="bold">.hide .show-lg</td>
				<td>Hidden</td>
				<td>Hidden</td>
				<td>Hidden</td>
				<td>Hidden</td>
				<td><span class="highlight">Visible</span></td>
			</tr>
			<tr>
				<td class="bold">.hide .show-xs .hide-sm .show-md .hide-lg</td>
				<td>Hidden</td>
				<td><span class="highlight">Visible</span></td>
				<td>Hidden</td>
				<td><span class="highlight">Visible</span></td>
				<td>Hidden</td>
			</tr>
			<tr>
				<td class="bold">.hide .show-sm .hide-md .show-lg</td>
				<td>Hidden</td>
				<td>Hidden</td>
				<td><span class="highlight">Visible</span></td>
				<td>Hidden</td>
				<td><span class="highlight">Visible</span></td>
			</tr>
			<tr>
				<td class="bold">.hide .show-md .hide-lg</td>
				<td>Hidden</td>
				<td>Hidden</td>
				<td>Hidden</td>
				<td><span class="highlight">Visible</span></td>
				<td>Hidden</td>
			</tr>
			<tr>
				<td class="bold">.hide .show-sm .hide-md</td>
				<td>Hidden</td>
				<td>Hidden</td>
				<td><span class="highlight">Visible</span></td>
				<td>Hidden</td>
				<td>Hidden</td>
			</tr>
			<tr>
				<td class="bold">.hide .show-xs .hide-sm</td>
				<td>Hidden</td>
				<td><span class="highlight">Visible</span></td>
				<td>Hidden</td>
				<td>Hidden</td>
				<td>Hidden</td>
			</tr>
		</tbody>
	</table>
</div>
