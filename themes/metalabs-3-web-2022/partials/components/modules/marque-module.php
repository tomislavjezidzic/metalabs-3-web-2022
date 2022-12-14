<?php
/**
 *
 * @var string $anchor_id
 * @var string $upper_text
 * @var string $bottom_text
 * @var array $gallery
 * @var ImageHelper $image_helper
 *
 */

use metalabs3Web2022\images\ImageHelper;

$anchor = !empty($anchor_id) ? 'id=' . $anchor_id : '';
?>
<section class="o-section o-section--with-padding" <?= esc_attr($anchor); ?> data-anchor-target="<?= $anchor_id; ?>">
    <div class="c-marque-module u-a3 u-fw-500 u-uppercase">
        <div class="c-marque-module__wrapper">
            <?php if (!empty($upper_text)) { ?>
                <div class="c-marque-module__item js-scroll-marquee">
                    <div class="c-marque-module__mover c-flickering-text js-flickering-text">
                        <?= wp_kses_post($upper_text); ?>
                    </div>
                    <div class="c-marque-module__mover c-flickering-text js-flickering-text">
                        <?= wp_kses_post($upper_text); ?>
                    </div>
                </div>
            <?php } ?>
        </div>
        <div class="c-marque-module__wrapper-infinite">
            <div class="c-marque-module__mover-infinite">
                <?php
                foreach ($gallery as $image) {
                    echo $image_helper->get_marque_logo_image($image);
                }
                ?>
            </div>
            <div class="c-marque-module__mover-infinite">
                <?php
                foreach ($gallery as $image) {
                    echo $image_helper->get_marque_logo_image($image);
                }
                ?>
            </div>
            <div class="c-marque-module__mover-infinite">
                <?php
                foreach ($gallery as $image) {
                    echo $image_helper->get_marque_logo_image($image);
                }
                ?>
            </div>
            <div class="c-marque-module__mover-infinite">
                <?php
                foreach ($gallery as $image) {
                    echo $image_helper->get_marque_logo_image($image);
                }
                ?>
            </div>
        </div>
        <div class="c-marque-module__wrapper u-a3 u-fw-500">
            <?php if (!empty($bottom_text)) { ?>
                <div class="c-marque-module__item js-scroll-marquee">
                    <div class="c-marque-module__mover">
                        <?= wp_kses_post($bottom_text); ?>
                    </div>
                    <div class="c-marque-module__mover">
                        <?= wp_kses_post($bottom_text); ?>
                    </div>
                </div>
            <?php } ?>
        </div>
    </div>
</section>
