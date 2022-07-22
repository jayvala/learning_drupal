<?php

namespace Drupal\location_assignment\Plugin\Block;

use Drupal\Core\Block\BlockBase;

/**
 * Provides a block with a simple text.
 *
 * @Block(
 *   id = "display_block",
 *   admin_label = @Translation("Display block"),
 * )
 */
class DisplayBlock extends BlockBase {
  /**
   * Site location config.
   *
   * @var Drupal\Core\Config\ImmutableConfig
   */
  protected $config;

  /**
   * Construct a CurrentTimeManager object.
   *
   * @param \Drupal\Core\Config\ConfigFactoryInterface $config_factory
   *   ConfigFactoryInterface.
   */

  /**
   * {@inheritdoc}
   */
  public function build() {
    $time = \Drupal::service('location_assignment.currenttime_manager')->getCurrentTime();
    $config_factory = \Drupal::configFactory()->get('location.settings');
    $timezone = $config_factory->get('timezone');
    $js_settings = [
      'time' => $time,
      'timezone' => $timezone,
    ];
    $build['#attached']['library'][] = 'location_assignment/location_assignment_lib';
    $build['#attached']['drupalSettings'] = $js_settings;
    $build['#theme'] = 'location_assignment_display_block';

    return $build;
  }

}
