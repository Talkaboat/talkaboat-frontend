import {
  trigger,
  state,
  style,
  animate,
  transition,
  animateChild,
  group,
  query,
  stagger,
} from '@angular/animations';

export const listAnimation =
  trigger('list', [
    transition(':enter', [
      query('@listItem', stagger(100, animateChild()))
    ]),
  ]);

export const listItemAnimation =
  trigger('listItem', [
    transition(':enter', [
      style({ transform: 'scale(0.5)', opacity: 0 }),  // initial
      animate('1s cubic-bezier(.8, -0.6, 0.2, 1.5)',
        style({ transform: 'scale(1)', opacity: 1 }))  // final
    ]),
    transition(':leave', [
      style({ transform: 'scale(1)', opacity: 1, height: '*' }),
      animate('1s cubic-bezier(.8, -0.6, 0.2, 1.5)',
       style({
         transform: 'scale(0.5)', opacity: 0,
         height: '0px', margin: '0px'
       }))
    ])
  ]);

export const fader =
  trigger('routeAnimations', [

  ]);

export const slider =
  trigger('routeAnimations', [
    transition('* => isBottom', fadeTo('bottom')),
    transition('isBottom => isRight', fadeTo('top')),
    transition('isBottom => *', slideTo('left')),
    transition('* => isLeft', slideTo('left')),
    transition('* => isRight', slideTo('right')),
    transition('isRight => *', slideTo('left')),
    transition('isLeft => *', slideTo('right')),
  ]);

function fadeTo(direction: any) {
  const optional = { optional: true };
  return [
    query(':enter, :leave', [
      style({
        position: 'absolute',
        left: 0,
        width: '100%',
        opacity: 0,
        transform: 'scale(0%) translateY(100%)',
      }),
    ]),
    // Animate the new page in
    query(':enter', [
      animate('1000ms ease', style({ opacity: 1, transform: 'scale(1) translateY(0)' })),
    ])
  ]
}

function slideTo(direction: any) {
  const optional = { optional: true };
  return [
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        [direction]: 0,
        width: '100%'
      })
    ], optional),
    query(':enter', [
      style({ [direction]: '-100%'})
    ]),
    group([
      query(':leave', [
        animate('600ms ease', style({ [direction]: '100%'}))
      ], optional),
      query(':enter', [
        animate('600ms ease', style({ [direction]: '0%'}))
      ])
    ]),
    query(':leave', animateChild()),
    query(':enter', animateChild()),
  ];
}
