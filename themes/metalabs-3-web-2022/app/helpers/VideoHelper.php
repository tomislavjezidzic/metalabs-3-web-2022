<?php

namespace metalabs3Web2022\helpers;

class VideoHelper {
	public function get_video_data( array $video = array() ): array {
		if ( empty( $video ) ) {
			return array();
		}

		return match ( $video['type'] ) {
			'upload' => array(
				'url' => ! empty( $video['upload'] ) && ! empty( $video['upload']['url'] ) ? $video['upload']['url'] : '',
			),
			'url' => array(
				'url' => ! empty( $video['url'] ) ? $video['url'] : '',
			),
			default => array(),
		};

	}
}