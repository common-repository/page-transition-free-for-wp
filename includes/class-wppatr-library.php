<?php
/**
 * Transition library class
 *
 * @package WPPageTransitionFree
 * @since   5.8.1
 */

defined( 'ABSPATH' ) || exit;

if ( ! class_exists( 'WPPATR_Library' ) ) {

	/**
	 * Library of transitions (composed of overlay and page animation) and loaders
	 *
	 * @version 5.4.1
	 */
	class WPPATR_Library {

		const LOADERS = array(
			array(
				'code'     => '{"css":{"anim":"@keyframes anim-layout-ZoXpP{0%{top: 8px;height: 64px;}50%, 100%{top: 24px;height: 32px;}}@keyframes anim-layout-wVQkY{0%{top: 8px;height: 64px;}50%, 100%{top: 24px;height: 32px;}}@keyframes anim-layout-qrSRw{0%{top: 8px;height: 64px;}50%, 100%{top: 24px;height: 32px;}}","time":"#layout-kRuJc{display: inline-block;position: relative;width: 80px;height: 80px;}#layout-ZoXpP{display: inline-block;position: absolute;left: 8px;width: 16px;background-color: #fff;animation-name: anim-layout-ZoXpP;animation-duration:1200ms;animation-timing-function: cubic-bezier(0, 0.5, 0.5, 1);animation-iteration-count:infinite;left: 8px;animation-delay:-240ms;}#layout-wVQkY{display: inline-block;position: absolute;left: 8px;width: 16px;background-color: #fff;animation-name: anim-layout-wVQkY;animation-duration:1200ms;animation-timing-function: cubic-bezier(0, 0.5, 0.5, 1);animation-iteration-count:infinite;left: 32px;animation-delay:-120ms;}#layout-qrSRw{display: inline-block;position: absolute;left: 8px;width: 16px;background-color: #fff;animation-name: anim-layout-qrSRw;animation-duration:1200ms;animation-timing-function: cubic-bezier(0, 0.5, 0.5, 1);animation-iteration-count:infinite;left: 56px;animation-delay: 0;}"},"html":"<div id=\"layout-kRuJc\"><div id=\"layout-ZoXpP\"></div><div id=\"layout-wVQkY\"></div><div id=\"layout-qrSRw\"></div></div>"}',
				'category' => 'default',
			),
		);

		const TRANSITIONS = array(
			array(
				'title'    => 'Mere fade',
				'renderer' => 'fade.m4v',
				'overlay'  => array(
					'activ' => '0',
					'code'  => '{"css":{"main":"","in":{"from":"","to":"","time":""},"out":{"from":"","to":"","time":""}},"html":""}',
				),
				'page'     => array(
					'activ' => '1',
					'code'  => '{"in":"opacity:0%;transition-duration:400ms;","out":"opacity:0%;transition-duration:400ms;"}',
				),
			),
			array(
				'title'    => 'Mere overlay',
				'renderer' => 'mere-overlay.m4v',
				'overlay'  => array(
					'activ' => '1',
					'code'  => '{"css":{"main":"#yKuDV{width:100%;height:100%;overflow:hidden;}#vXnoJ{width:100%;height:100%;background-color:#0054FF;}","in":{"from":".init #vXnoJ{transform: translateX(0%);}","to":".page-loaded #vXnoJ{transform: translateX(100%);}","time":".init-time #DmGfc{transition-duration:600ms;transition-timing-function:cubic-bezier(0.75,0.01,0.25,1);}.init-time #vXnoJ{transition-timing-function:cubic-bezier(0.75,0.01,0.25,1);transition-duration:600ms;}"},"out":{"from":".change-page #vXnoJ{transform: translateX(-100%);}","to":".new-page #vXnoJ{transform:translateX(0%);}","time":".change-page-time #DmGfc{transition-duration:600ms;transition-timing-function:cubic-bezier(0.75,0.01,0.25,1);}.change-page-time #vXnoJ{transition-timing-function:cubic-bezier(0.75,0.01,0.25,1);transition-duration:600ms;}"}},"html":"<div id=\"yKuDV\"><div id=\"vXnoJ\"></div></div>"}',
				),
				'page'     => array(
					'activ' => '0',
					'code'  => '{"in":"","out":""}',
				),
			),
		);

		/**
		 * Get loaders.
		 *
		 * @version 5.4.1
		 * @return array loaders
		 */
		public static function get_loaders() {
			return self::LOADERS;
		}

		/**
		 * Get transitions.
		 *
		 * @version 5.4.1
		 * @return array loaders
		 */
		public static function get_transitions() {
			return self::TRANSITIONS;
		}

	}
}
