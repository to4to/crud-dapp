export type CrudDapp = {
  version: '0.1.0';
  name: 'crud_dapp';
  instructions: [
    {
      name: 'close';
      accounts: [
        {
          name: 'payer';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'crudDapp';
          isMut: true;
          isSigner: false;
        }
      ];
      args: [];
    },
    {
      name: 'decrement';
      accounts: [
        {
          name: 'crudDapp';
          isMut: true;
          isSigner: false;
        }
      ];
      args: [];
    },
    {
      name: 'increment';
      accounts: [
        {
          name: 'crudDapp';
          isMut: true;
          isSigner: false;
        }
      ];
      args: [];
    },
    {
      name: 'initialize';
      accounts: [
        {
          name: 'payer';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'crudDapp';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'systemProgram';
          isMut: false;
          isSigner: false;
        }
      ];
      args: [];
    },
    {
      name: 'set';
      accounts: [
        {
          name: 'crudDapp';
          isMut: true;
          isSigner: false;
        }
      ];
      args: [
        {
          name: 'value';
          type: 'u8';
        }
      ];
    }
  ];
  accounts: [
    {
      name: 'crudDapp';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'count';
            type: 'u8';
          }
        ];
      };
    }
  ];
};

export const IDL: CrudDapp = {
  version: '0.1.0',
  name: 'crud_dapp',
  instructions: [
    {
      name: 'close',
      accounts: [
        {
          name: 'payer',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'crudDapp',
          isMut: true,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: 'decrement',
      accounts: [
        {
          name: 'crudDapp',
          isMut: true,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: 'increment',
      accounts: [
        {
          name: 'crudDapp',
          isMut: true,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: 'initialize',
      accounts: [
        {
          name: 'payer',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'crudDapp',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: 'set',
      accounts: [
        {
          name: 'crudDapp',
          isMut: true,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'value',
          type: 'u8',
        },
      ],
    },
  ],
  accounts: [
    {
      name: 'crudDapp',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'count',
            type: 'u8',
          },
        ],
      },
    },
  ],
};