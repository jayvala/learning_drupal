<?php

namespace Drupal\location_assignment\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Config\ConfigFactoryInterface;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Drupal\location_assignment\CurrentTimeManager;
/**
 * Provides a block with a simple text.
 *
 * @Block(
 *   id = "display_block",
 *   admin_label = @Translation("Display block"),
 * )
 */
class DisplayBlock extends BlockBase implements ContainerFactoryPluginInterface {
  /**
   * Site location config.
   *
   * @var Drupal\Core\Config\ImmutableConfig
   */
  protected $config;

  /**
   * current time.
   *
   * @var Drupal\location_assignment\CurrentTimeManager
   */
  protected $time;

  /**
   * Construct a CurrentTimeManager object.
   *
   * @param \Drupal\Core\Config\ConfigFactoryInterface $config_factory
   *   ConfigFactoryInterface.
   * @param \Drupal\location_assignment\CurrentTimeManager $time
   *   CurrentTimeManager.
   */
  public function __construct(array $configuration, $plugin_id, $plugin_definition, ConfigFactoryInterface $config_factory, CurrentTimeManager $time) {
    parent::__construct($configuration, $plugin_id, $plugin_definition);
    $this->config = $config_factory->get('location.settings');
    $this->time = $time->getCurrentTime();
  }

  /**
   * @param \Symfony\Component\DependencyInjection\ContainerInterface $container
   * @param array $configuration
   * @param string $plugin_id
   * @param mixed $plugin_definition
   * @param string $time
   *
   * @return static
   */
  public static function create(ContainerInterface $container, array $configuration, $plugin_id, $plugin_definition) {
    return new static(
      $configuration,
      $plugin_id,
      $plugin_definition,
      $container->get('config.factory'),
      $container->get('location_assignment.currenttime_manager')
    );
  }

  /**
   * {@inheritdoc}
   */
  public function build() {
    $timezone = $this->config->get('timezone');
    $time = $this->time;
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
