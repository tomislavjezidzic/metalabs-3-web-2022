<?php
/**
 * The template for displaying the footer
 *
 * Contains the closing of the "site-content" div and all content after.
 *
 * NOTICE: Don't forget to add wp_footer(); call.
 *
 * @package WordPress
 * @subpackage Twenty_Fifteen
 * @since Twenty Fifteen 1.0
 */
get_partial( 'layout/cookie-message' );

?>

<script>
    window.dracoPath = "<?= bu( "draco" ); ?>/";
</script>

<?php wp_footer(); ?>

</body>
</html>
