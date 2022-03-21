import {
  animate, animateChild,
  group,
  query,
  stagger, style, transition, trigger
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

export const slider =
  trigger('routeAnimations', [
    transition('home => isRight', slideTo('right')),
    transition('home => isLeft', slideTo('left')),
    transition('home => *', fadeTo()),
    transition('isRight => home', slideTo('left')),
    transition('isLeft => home', slideTo('right')),
    transition('isBottom => *', fadeTo()),
    transition('isRight => isLeft', slideTo('left')),
    transition('isLeft => isRight', slideTo('right')),
    transition('isRight => isBottom', fadeTo())
  ]);


function fadeTo() {
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
    ], optional),
    // Animate the new page in
    query(':enter', [
      animate('1000ms ease', style({ opacity: 1, transform: 'scale(1) translateY(0)' })),
    ], optional)
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
    ], optional),
    group([
      query(':leave', [
        animate('600ms ease', style({ [direction]: '100%'}))
      ], optional),
      query(':enter', [
        animate('600ms ease', style({ [direction]: '0%'}))
      ], optional)
    ]),
    query(':leave', animateChild(), optional),
    query(':enter', animateChild(), optional),
  ];
}
