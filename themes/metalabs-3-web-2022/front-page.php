<?php

use metalabs3Web2022\acf\ACFProvider;
use metalabs3Web2022\helpers\MediumEditorHelper;

$template_name = 'home';
get_header();

get_partial('layout/loader');
get_partial('layout/navigation');
get_partial('layout/cursor');

$acf_provider         = ACFProvider::get_instance();
$medium_editor_helper = new MediumEditorHelper();
?>

    <!-- PAGE WRAPPER -->
    <div id="<?= $template_name ?>" class="o-page o-page--<?= $template_name ?>">
        <div id="smoothscroll-wrapper">
            <div id="smoothscroll-content">

                <?php
                $header = $acf_provider->get_field('header');
                get_partial('components/header', array(
                    'title'    => $medium_editor_helper->replace_span_with_b($header['medium_editor_title']),
                    'subtitle' => $header['subtitle'] ?? '',
                    'model'    => $header['model'],
                ));
                ?>

                <!-- PAGE CONTENT -->
                <div class="o-page__inner o-page__inner--<?= $template_name ?>" id="content">
                    <?php get_modules_partial($acf_provider->get_field('modules')); ?>
                </div>
                <!-- //PAGE CONTENT -->
                <?php get_partial('layout/footer'); ?>
            </div>
        </div>
    </div>
    <!-- //PAGE WRAPPER -->
<?php
get_footer();
